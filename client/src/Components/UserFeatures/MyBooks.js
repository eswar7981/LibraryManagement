import * as React from "react";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Container, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";

const MyBooks = () => {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [page, setPage] = React.useState(0);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [searchResultData, setSearchResultData] = React.useState([
    {
      title: "A Great Novel",
      category: "Story",
      author: "Eswar",
      due:'20 days left',

    },
    {
      title: "A Great Novel",
      category: "Story",
      author: "Eswar",
       due:'20 days left'
    },
    {
      title: "A Great Novel",
      category: "Story",
      author: "Eswar",
      due:'extend due'
    },
    {
      title: "A Great Novel",
      category: "Story",
      author: "Eswar",
        due:'extend due'
    },
    {
      title: "A Great Novel",
      category: "Story",
      author: "Eswar",
        due:'extend due'
    },
    {
      title: "A Great Novel",
      category: "Story",
      author: "Eswar",
        due:'extend due'
    },
    {
      title: "A Great Novel",
      category: "Story",
      author: "Eswar",
        due:'extend due'
    },
    {
      title: "A Great Novel",
      category: "Story",
      author: "Eswar",
      due:'extend due'
    },
    {
      title: "A Great Novel",
      category: "Story",
      author: "Eswar",
       due:'extend due'
    },
    {
      title: "A Great Novel",
      category: "Story",
      author: "Eswar",
       due:'extend due'
    },
    {
      title: "A Great Novel",
      category: "Story",
      author: "Eswar",
        due:'extend due'
    },
  ]);

  return (
    <>
      <Typography sx={{mt:'10px'}} align="center" variant='h5' component='h1'>Borrowed Books</Typography>

      <Container component={Paper}>
        <Table
          sx={{
            minWidth: 300,
            mt: "20px",
            
          }}
          aria-label="customized table"
        >
          <TableHead  sx={{ backgroundColor: "#2196F3" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>S.No</TableCell>
              <TableCell sx={{ color: "white" }}>Title</TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Category
              </TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Author
              </TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Due on
              </TableCell>
              <TableCell sx={{ color: "white" }} align="right">
             
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResultData &&
              searchResultData.map((book, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {book.title}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {book.category}
                  </StyledTableCell>
                  
                  <StyledTableCell align="right">{book.author}</StyledTableCell>
                 
                  <StyledTableCell align="right">
                   12/22/22
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    
                   {!book.returned
&&                    <>
                    <Button
                          sx={{ backgroundColor: "#1A237E", color: "white",mr:4 }}
                        >
                          Extend DUE
                        </Button>
                        <Button
                          sx={{ backgroundColor: "#1A237E", color: "white" }}
                        >
                         Return
                        </Button>
                        </>
                   }
                        
                    
                    
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default MyBooks;
