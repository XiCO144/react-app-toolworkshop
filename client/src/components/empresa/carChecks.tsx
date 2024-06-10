import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table";
import { format } from "date-fns";
import { Button } from "../ui/button";
  
export function CarChecksEnterprise () {
    const [searchDataChecks, setSearchDataChecks] = useState<any[]>([]);
    const API_URL = "http://localhost:3000";

    useEffect(() => {
        const fetchData = async()=> {
            try{
                const searchResponseChecks = await fetch(`${API_URL}/carChecks`)
                const searchDataChecks = await searchResponseChecks.json();
                setSearchDataChecks(searchDataChecks);
            }catch (error){
                console.error("Error fetchind data:", error);
            }
        };
        fetchData();
    },[]);

    const handleCheckState = async (checkId: number, newState: string) => {
        console.log(checkId);
        try {
          const response = await fetch(`${API_URL}/changeCheckState/${checkId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: checkId,
            }),
          });
      
          if (response.ok) {
            const updatedData = searchDataChecks.map((check) =>
              check.id === checkId ? { ...check, estado: newState } : check
            );
            setSearchDataChecks(updatedData);
          } else {
            console.error("Error changing check state:", await response.text());
          }
        } catch (error) {
          console.error("Error during update:", error);
        }
      };
  return (
    <div className="p-8 max-w-5xl space-y-4 m-auto">
        <h1 className="text-4xl">Revisões agendadas por clientes</h1>
        <div className="border rounded-lg p-2">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[130px]">Nome de cliente</TableHead>
                <TableHead className="w-[130px]">Número de telemóvel</TableHead>
                <TableHead className="w-[150px]">Carro</TableHead>
                <TableHead className="w-[150px]">Matrícula</TableHead>
                <TableHead className="w-[150px]">Data agendada</TableHead>
                <TableHead className="w-[150px]">Estado da revisão</TableHead>
                </TableRow>
            </TableHeader>
            {searchDataChecks.length > 0 && (
                <TableBody>
                {searchDataChecks.map((checkData) => (
                <TableRow key={checkData.id} className="hover:bg-muted/50">
                    <TableCell>{checkData.nome_cliente}</TableCell>
                    <TableCell>{checkData.numero_tele}</TableCell>
                    <TableCell>{checkData.carro}</TableCell>
                    <TableCell>{checkData.matricula}</TableCell>
                    <TableCell>{format(new Date(checkData.data_agendada), 'dd-MM-yyyy')}</TableCell>
                    <TableCell>{checkData.estado}</TableCell>
                    {checkData.estado !== "Aceite" && checkData.estado !== "Não Aceite" && (
                    <TableCell className="flex gap-x-6">
                        <Button 
                        onClick={() => handleCheckState(checkData.id, "Aceite")}
                        className="bg-[#00865A] hover:bg-green-900 text-white">
                            Aceitar
                        </Button>
                        <Button 
                        onClick={() => handleCheckState(checkData.id, "Não Aceite")} 
                        className="bg-red-600 text-white hover:bg-red-800">
                            Rejeitar
                        </Button>
                    </TableCell>
                    )}
                </TableRow>
                ))}
                </TableBody>
            )}
            </Table>
        </div>
    </div>
    
  )
}