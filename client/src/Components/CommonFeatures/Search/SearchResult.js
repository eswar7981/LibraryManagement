import * as React from "react";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Container, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import "./SearchBar.css";

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




const SearchResult = () => {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [page, setPage] = React.useState(0);

  const [isHovered, setIsHovered] = React.useState(false);

  const hoverHandler = () => {
    setIsHovered(!isHovered);
  };

  const [searchResultData, setSearchResultData] = React.useState([
    {
      title: "A Great Novel",
      category: "Story",
      author: "Eswar",
      available: false,
    },
    {
      title: "A Great Novel",
      category: "Story",
      author: "Eswar",
      available: true,
    },
    {
      title: "A Great Novel",
      category: "Story",
      author: "Eswar",
      available: true,
    },
    {
      title: "A Great Novel",
      category: "Story",
      author: "Eswar",
      available: false,
    },
    {
      title: "A Great Novel",
      category: "Story",
      author: "Eswar",
      available: true,
    },
    {
      title: "A Great Novel",
      category: "Story",
      author: "Eswar",
      available: false,
    },
    {
      title: "A Great Novel",
      category: "Story",
      author: "Eswar",
      available: true,
    },
    {
      title: "A Great Novel",
      category: "Story",
      author: "Eswar",
      available: true,
    },
    {
      title: "A Great Novel",
      category: "Story",
      author: "Eswar",
      available: true,
    },
    {
      title: "A Great Novel",
      category: "Story",
      author: "Eswar",
      available: true,
    },
    {
      title: "A Great Novel",
      category: "Story",
      author: "Eswar",
      available: true,
    },
  ]);

  return (
    <>
    <Typography sx={{mt:'20px'}} align='center' variant="h6" component='h3'>
      Results
    </Typography>
    <Container component={Paper}>
      <Table
        sx={{
          minWidth: 300,
          
        }}
        aria-label="customized table"
      >
        <TableHead sx={{ backgroundColor: "#2196F3" }}>
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
              Availability
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
                <StyledTableCell align="right">{book.category}</StyledTableCell>
                <StyledTableCell align="right">{book.author}</StyledTableCell>
                <StyledTableCell align="right">
                  {book.available ? (
                    <>
                      <Button
                        onMouseOver={hoverHandler}
                        sx={{ backgroundColor: "#1A237E", color: "white" }}
                      >
                        Borrow
                      </Button>
                      {isHovered && (
                        <div className="flex">
                          <Button
                            sx={{ backgroundColor: "#1A237E", color: "white" }}
                          >
                            30 days
                          </Button>
                          <Button
                            sx={{ backgroundColor: "#1A237E", color: "white" }}
                          >
                            60 days
                          </Button>
                          <Button
                            sx={{ backgroundColor: "#1A237E", color: "white" }}
                          >
                            90 days
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <Button variant="contained" disabled>
                     may available in 10 days
                    </Button>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPage="10"
        component="div"
        page={page}
        onPageChange={handleChangePage}
      />
    </Container>
    </>
  );
};

export default SearchResult;
