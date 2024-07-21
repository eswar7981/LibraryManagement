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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const dispatch = useDispatch();

  const token = useSelector((state) => state.librarian.token);

  const [edit, setEdit] = React.useState(false);

  const [editBookDetails, setEditBookDetails] = React.useState({
    title: "",
    category: "",
    author: "",
    copies: "",
  });

  const [page, setPage] = React.useState(0);

  const [isHovered, setIsHovered] = React.useState(false);

  const editHandler = async (e, title, category, author, copies) => {
    e.preventDefault();
    setEdit(true);
    console.log(token);
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
          id: id,
        }),
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    const response = await editBook.json();

    if (response.status === "success") {
      dispatch(librarianActions.setRefresh());
    }

    setEditBookDetails({
      title: "",
      category: "",
      author: "",
      copies: "",
    });

    setEdit(false);
  };

  const deleteHandler = (e, id) => {
    e.preventDefault();
    console.log("sdsd");
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

  return (
    <>
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
              {props.mode === "user" ||
                (props.mode === "visitor" && (
                  <TableCell sx={{ color: "white" }} align="center">
                    Availability
                  </TableCell>
                ))}

              {props.mode === "librarian" && (
                <TableCell sx={{ color: "white" }} align="center">
                  Options
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data &&
              props.data.map((book, index) => (
                <StyledTableRow key={index}>
                  {props.mode === "visitor" && <></>}
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
                    <StyledTableCell>
                      {props.mode === "user" && book.available ? (
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
                                sx={{
                                  backgroundColor: "#1A237E",
                                  color: "white",
                                }}
                              >
                                30 days
                              </Button>
                              <Button
                                sx={{
                                  backgroundColor: "#1A237E",
                                  color: "white",
                                }}
                              >
                                60 days
                              </Button>
                              <Button
                                sx={{
                                  backgroundColor: "#1A237E",
                                  color: "white",
                                }}
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
                  )}
                  <StyledTableCell align="center">
                    {props.mode === "librarian" && (
                      <div style={{ display: "flex", alignContent: "center" }}>
                        {!edit ? (
                          <Button
                            sx={{
                              backgroundColor: "#1A237E",
                              color: "white",
                            }}
                            onClick={(e) =>
                              editHandler(
                                e,
                                book.title,
                                book.category,
                                book.author,
                                book.copies
                              )
                            }
                          >
                            Edit
                          </Button>
                        ) : (
                          <Button
                            sx={{
                              backgroundColor: "#1A237E",
                              color: "white",
                              mr: 3,
                            }}
                            onClick={(e) => submitEditHandler(e,book._id)}
                          >
                            Submit
                          </Button>
                        )}
                        {!edit && (
                          <Button
                            sx={{ backgroundColor: "#1A237E", color: "white" }}
                            onClick={(e) => deleteHandler(e, 4)}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
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

export default ResultTable;
