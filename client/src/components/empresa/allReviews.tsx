import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination"
import Rating from '@mui/material/Rating'

export function AllReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const rowsPerPage = 6;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);
  const [totalPages, setTotalPages] = useState(0);
  const currentPage = Math.floor(startIndex / rowsPerPage) + 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/reviews');
        const data = await response.json();
        setReviews(data);
        console.log(data);
        setTotalPages(Math.ceil(data.length / rowsPerPage));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handlePagination = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      if (endIndex < reviews.length) {
        setStartIndex(startIndex + rowsPerPage);
        setEndIndex(endIndex + rowsPerPage);
      }
    } else {
      if (startIndex > 0) {
        setStartIndex(startIndex - rowsPerPage);
        setEndIndex(endIndex - rowsPerPage);
      }
    }
  };

  return (
    <div className="p-8 max-w-5xl space-y-4 m-auto">
        <h1 className="text-3xl">Avaliações</h1>
        <div className="border rounded-lg p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[130px]">Nome</TableHead>
                <TableHead className="w-[130px]">Email</TableHead>
                <TableHead className="w-[130px]">Descrição</TableHead>
                <TableHead className="w-[130px]">Estrelas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>{review.nome}</TableCell>
                  <TableCell>{review.email}</TableCell>
                  <TableCell>{review.descricao}</TableCell>
                  <TableCell><Rating defaultValue={review.estrelas} readOnly /></TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePagination('prev')} 
                  />
              </PaginationItem>
              <PaginationItem>
                <span>
                  Página {currentPage} de {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePagination('next')} 
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
    </div>
  );
}