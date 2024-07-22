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
import Alert from "@mui/material/Alert";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../Store/User";

const MyBooks = () => {
  const [updatePage, setUpdatePage] = React.useState(false);

  const [books, setBooks] = React.useState([]);

  const [displayMessage, setDisplayMessage] = React.useState({
    status: false,
    message: "",
    mode: "",
  });

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/user/borrow-book`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: userToken,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
       
        setBooks(res.books);
      });
  }, [updatePage]);

  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [page, setPage] = React.useState(0);

  const userToken = useSelector((state) => state.user.token);

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


  const extendDueHandler = async (e, id) => {
    e.preventDefault();

    const returnBook = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/extend-due`,
      {
        method: "PATCH",
        body: JSON.stringify({
          bookId: id,
        }),
        headers: {
          "Content-Type": "application/json",
          token: userToken,
        },
      }
    );

    const response = await returnBook.json();

    if (response.status === "success") {
      setDisplayMessage({
        status: true,
        mode: "success",
        message: "Due is extended for 30 more Days !",
      });
      

      setTimeout(() => {
        setDisplayMessage({ ...displayMessage, ["status"]: false });
      }, 2000);
    }

    setUpdatePage(!updatePage);
  };

  const returnHandler = async (e, id) => {
    e.preventDefault();
    const returnBook = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/return-book`,
      {
        method: "DELETE",
        body: JSON.stringify({
          bookId: id,
        }),
        headers: {
          "Content-Type": "application/json",
          token: userToken,
        },
      }
    );

    const response = await returnBook.json();

    if (response.status === "success") {
      setDisplayMessage({
        status: true,
        mode: "success",
        message: "Thank you, book is successfully returned!",
      });
      

      setTimeout(() => {
        setDisplayMessage({ ...displayMessage, ["status"]: false });
      }, 2000);
    }
    setUpdatePage(!updatePage);
  };

  return (
    <>
      {displayMessage.status && (
        <div style={{ position: "fixed", top: "80px" }}>
          <Alert severity="info">{displayMessage.message}</Alert>
        </div>
      )}
      <Typography
        sx={{ mt: "10px" }}
        align="center"
        variant="h5"
        component="h1"
      >
        Borrowed Books
      </Typography>

      <Container component={Paper}>
        <Table
          sx={{
            minWidth: 300,
            mt: "20px",
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
                Due on
              </TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Issued By
              </TableCell>

              <TableCell sx={{ color: "white" }} align="right">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books &&
              books.map((book, index) => (
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

                  {book.returned ? (
                    <StyledTableCell align="right">-</StyledTableCell>
                  ) : (
                    <StyledTableCell align="right">
                      {new Date(book.dueDate).getDate()} -{" "}
                      {new Date(book.dueDate).getMonth()} -{" "}
                      {new Date(book.dueDate).getFullYear()}
                    </StyledTableCell>
                  )}

                  <StyledTableCell align="right">
                    {book.librarianName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {!book.returned && (
                      <>
                        <Button
                          type="submit"
                          sx={{
                            backgroundColor: "#1A237E",
                            color: "white",
                            mr: 4,
                          }}
                          onClick={(e) => extendDueHandler(e, book.bookId)}
                        >
                          Extend DUE for 30 days
                        </Button>
                        <Button
                          type="submit"
                          sx={{ backgroundColor: "#1A237E", color: "white" }}
                          onClick={(e) => returnHandler(e, book.bookId)}
                        >
                          Return
                        </Button>
                      </>
                    )}

                    {book.returned && (
                      <Button disabled sx={{ color: "white" }}>
                        Returned
                      </Button>
                    )}
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
