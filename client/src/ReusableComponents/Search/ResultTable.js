import * as React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Alert from "@mui/material/Alert";
import TableRow from "@mui/material/TableRow";
import { Container, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import { librarianActions } from "../../Store/Librarian";

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

const ResultTable = (props) => {
  const [displayMessage, setDisplayMessage] = React.useState({
    status: false,
    message: "",
    mode: "",
  });

  const dispatch = useDispatch();

  const token = useSelector((state) => state.librarian.token);

  const userToken = useSelector((state) => state.user.token);

  const [edit, setEdit] = React.useState(false);

  const [editBookDetails, setEditBookDetails] = React.useState({
    title: "",
    category: "",
    author: "",
    copies: "",
  });

  const [editBookId, setEditBookId] = React.useState();

  const [borrowed, setBorrowed] = React.useState(false);

  const [page, setPage] = React.useState(0);

  const [isHovered, setIsHovered] = React.useState(false);

  const editHandler = async (e, title, category, author, copies, bookId) => {
    e.preventDefault();
    setEdit(true);

    
    setEditBookId(bookId);

    setEditBookDetails({
      title: title,
      category: category,
      author: author,
      copies: copies,
    });
  };

  const submitEditHandler = async (e, id) => {
    e.preventDefault();

    const editBook = await fetch(
      `${process.env.REACT_APP_BASE_URL}/librarian/edit-book`,
      {
        method: "PUT",
        body: JSON.stringify({
          title: editBookDetails.title,
          category: editBookDetails.category,
          author: editBookDetails.author,
          copies: editBookDetails.copies,
          bookId: id,
        }),
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    const response = await editBook.json();

    if (response.status === "success") {
      setDisplayMessage({
        status: true,
        mode: "success",
        message: "edited book is live now",
      });
      dispatch(librarianActions.setRefresh());
    } else {
      setDisplayMessage({
        status: true,
        mode: "info",
        message: "book is already borrowed",
      });

    }
    setIsHovered(!isHovered);

    setEditBookDetails({
      title: "",
      category: "",
      author: "",
      copies: "",
    });

    setTimeout(() => {
      setDisplayMessage({ ...displayMessage, ["status"]: false });
    }, 2000);
    setEdit(false);
    setEditBookId()
  };

  const deleteHandler = async (e, id) => {
    e.preventDefault();

    const deleteBook = await fetch(
      `${process.env.REACT_APP_BASE_URL}/librarian/delete-book?bookId=${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    const response = await deleteBook.json();

    if (response.status === "success") {
      setDisplayMessage({
        status: true,
        mode: "success",
        message: "book is removed from library",
      });
      dispatch(librarianActions.setRefresh());
    } else {
      setDisplayMessage({
        status: true,
        mode: "info",
        message: "book removal failed",
      });
    }
    setIsHovered(!isHovered);

    setEditBookDetails({
      title: "",
      category: "",
      author: "",
      copies: "",
    });
    setTimeout(() => {
      setDisplayMessage({ ...displayMessage, ["status"]: false });
    }, 2000);
    setEdit(false);
  };

  const cancelBorrowProcess = (e) => {
    e.preventDefault();
    setIsHovered(false);
  };

  const editTitleHandler = (e) => {
    e.preventDefault();
    setEditBookDetails({ ...editBookDetails, ["title"]: e.target.value });
  };

  const editCopiesHandler = (e) => {
    e.preventDefault();
    setEditBookDetails({ ...editBookDetails, ["copies"]: e.target.value });
  };

  const editAuthorHandler = (e) => {
    e.preventDefault();
    setEditBookDetails({ ...editBookDetails, ["author"]: e.target.value });
  };

  const editCategoryHandler = (e) => {
    e.preventDefault();
    setEditBookDetails({ ...editBookDetails, ["category"]: e.target.value });
  };

  const hoverHandler = () => {
    setIsHovered(!isHovered);
  };

  const borrowPeriodHandler = async (e, period, id) => {
    e.preventDefault();

    const borrowBook = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/borrow-book`,
      {
        method: "POST",
        body: JSON.stringify({
          bookId: id,
          borrowPeriod: period,
        }),
        headers: {
          "Content-Type": "application/json",
          token: userToken,
        },
      }
    );

    const response = await borrowBook.json();

    if (response.status === "success") {
      setDisplayMessage({
        status: true,
        mode: "success",
        message: "book is successfully borrowed",
      });
    } else {
      setDisplayMessage({
        status: true,
        mode: "info",
        message: "book is already borrowed",
      });
    }
    setIsHovered(!isHovered);

    setTimeout(() => {
      setDisplayMessage({ ...displayMessage, ["status"]: false });
    }, 2000);
  };

  return (
    <>
      {displayMessage.status && (
        <div style={{ position: "fixed", top: "80px" }}>
          <Alert severity="info">{displayMessage.message}</Alert>
        </div>
      )}

      <Typography
        sx={{ mt: "20px" }}
        align="center"
        variant="h6"
        component="h3"
      >
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
              <TableCell sx={{ color: "white" }} align="center">
                Title
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Category
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Author
              </TableCell>
              {props.mode === "librarian" && (
                <TableCell sx={{ color: "white" }} align="center">
                  Copies
                </TableCell>
              )}
              {props.mode === "user" && (
                <TableCell sx={{ color: "white" }} align="center">
                  Availability
                </TableCell>
              )}

              {props.mode === "visitor" && (
                <TableCell sx={{ color: "white" }} align="center">
                  Availability
                </TableCell>
              )}

              {props.mode === "librarian" && (
                <TableCell sx={{ color: "white" }} align="center">
                  Options
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {editBookId && (
              <>
                {" "}
                <StyledTableCell component="th" scope="row">
                  Edit mode
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <TextField
                    size="small"
                    value={editBookDetails.title}
                    onChange={editTitleHandler}
                    type="text"
                  ></TextField>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <TextField
                    size="small"
                    value={editBookDetails.category}
                    onChange={editCategoryHandler}
                  ></TextField>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <TextField
                    size="small"
                    value={editBookDetails.author}
                    onChange={editAuthorHandler}
                  ></TextField>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  <TextField
                    size="small"
                    type="number"
                    value={editBookDetails.copies}
                    onChange={editCopiesHandler}
                  ></TextField>
                </StyledTableCell>{" "}
                <StyledTableCell>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ backgroundColor: "#1A237E", color: "white" }}
                    onClick={(e) => submitEditHandler(e, editBookId)}
                  >
                    Submit
                  </Button>
                </StyledTableCell>
              </>
            )}
            {!editBookId &&
              props.data &&
              props.data.map((book, index) => (
                <StyledTableRow key={index}>
                  {props.mode === "librarian" && edit ? (
                    <>
                      {" "}
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <TextField
                          size="small"
                          value={editBookDetails.title}
                          onChange={editTitleHandler}
                          type="text"
                        ></TextField>
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <TextField
                          size="small"
                          value={editBookDetails.category}
                          onChange={editCategoryHandler}
                        ></TextField>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <TextField
                          size="small"
                          value={editBookDetails.author}
                          onChange={editAuthorHandler}
                        ></TextField>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {" "}
                        <TextField
                          size="small"
                          type="number"
                          value={editBookDetails.copies}
                          onChange={editCopiesHandler}
                        ></TextField>
                      </StyledTableCell>{" "}
                    </>
                  ) : (
                    <>
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>

                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {book.title}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {book.category}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {book.author}
                      </StyledTableCell>
                      {props.mode === "librarian" && (
                        <StyledTableCell align="center">
                          {book.copies}
                        </StyledTableCell>
                      )}
                      {props.mode === "visitor" && (
                        <StyledTableCell align="center">
                          <Button variant="contained" disabled>
                            login to borrow this book
                          </Button>
                        </StyledTableCell>
                      )}
                    </>
                  )}

                  {props.mode === "user" && (
                    <StyledTableCell align="center">
                      {props.mode === "user" && (
                        <>
                          {!isHovered && (
                            <Button
                              variant="contained"
                              onClick={hoverHandler}
                              sx={{
                                backgroundColor: "#1A237E",
                                color: "white",
                              }}
                            >
                              Borrow
                            </Button>
                          )}
                          {isHovered && (
                            <div className="flex">
                              <Button
                                variant="contained"
                                sx={{
                                  backgroundColor: "#1A237E",
                                  color: "white",
                                  mr: 2,
                                }}
                                onClick={(e) =>
                                  borrowPeriodHandler(e, 30, book._id)
                                }
                              >
                                30 days
                              </Button>
                              <Button
                                variant="contained"
                                sx={{
                                  backgroundColor: "#1A237E",
                                  color: "white",
                                  mr: 2,
                                }}
                                onClick={(e) =>
                                  borrowPeriodHandler(e, 60, book._id)
                                }
                              >
                                60 days
                              </Button>
                              <Button
                                variant="contained"
                                sx={{
                                  backgroundColor: "#1A237E",
                                  color: "white",
                                  mr: 2,
                                }}
                                onClick={(e) =>
                                  borrowPeriodHandler(e, 90, book._id)
                                }
                              >
                                90 days
                              </Button>
                              <Button
                                variant="contained"
                                sx={{
                                  backgroundColor: "red",
                                  color: "white",
                                }}
                                onClick={(e) => cancelBorrowProcess(e)}
                              >
                                <ClearIcon></ClearIcon>
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </StyledTableCell>
                  )}

                  {book._id !== editBookId && edit && (
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#1A237E",
                          color: "white",
                          mr: 2,
                        }}
                        onClick={(e) =>
                          editHandler(
                            e,
                            book.title,
                            book.category,
                            book.author,
                            book.copies,
                            book._id
                          )
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        sx={{ backgroundColor: "#1A237E", color: "white" }}
                        onClick={(e) => deleteHandler(e, book._id)}
                        variant="contained"
                      >
                        Delete
                      </Button>
                    </StyledTableCell>
                  )}

                  {props.mode === "librarian" && !edit && !editBookId && (
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#1A237E",
                          color: "white",
                          mr: 2,
                        }}
                        onClick={(e) =>
                          editHandler(
                            e,
                            book.title,
                            book.category,
                            book.author,
                            book.copies,
                            book._id
                          )
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        sx={{ backgroundColor: "#1A237E", color: "white" }}
                        onClick={(e) => deleteHandler(e, book._id)}
                        variant="contained"
                      >
                        Delete
                      </Button>
                    </StyledTableCell>
                  )}
                  {editBookId && book._id === editBookId && (
                    <StyledTableCell>
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{ backgroundColor: "#1A237E", color: "white" }}
                        onClick={(e) => submitEditHandler(e, book._id)}
                      >
                        Submit
                      </Button>
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default ResultTable;
