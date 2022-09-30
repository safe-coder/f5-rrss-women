import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { Pagination } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableFooter,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

export default function UserList() {
  const [data, setData] = useState([]);
  const { auth } = useSelector((state) => state);

  console.log(data);
  console.log(auth);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/", {
        headers: { Authorization: auth.token },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data.users);
      });
  }, [auth.token]);

  const handleClick = (userId) => {
    axios.delete(`http://localhost:5000/api/user/${userId}`, {
      headers: { Authorization: auth.token },
    });
    setOpen(false);
  };

  const newData = data.filter((user) => {
    return !user.role.includes("superadmin");
  });
  console.log(newData);

  // const [pagination, setPagination] = useState({
  //   count: 0,
  //   from: 0,
  //   to: pageSize
  // });

  //   useEffect(() => {
  //     data.setData({from: pagination.from, to: pagination.to}).then(response => {
  //       setPagination({...pagination, count: response.count });
  //     })
  //   }, [pagination.from, pagination.to])

  // const handlePageChange = (event, page) => {
  //   const from = (page - 1) * pageSize;
  //   const to = (page - 1) * pageSize + pageSize;

  //   setPagination({ ...pagination, from: from, to: to});
  // }

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <TableContainer
      component={Paper} 
      style={{ width: "40%", fontFamily: "Jet", backgroundColor: "#FF9E00" }}
    >
      <Table aria-label="simple table"  size="small">
        <TableHead style={{ backgroundColor: "#FF9E00" }}>
          <TableRow key={newData.user}>
            <TableCell>Nombre Completo</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user) => (
              <TableRow
                key={user.username}
                style={{ backgroundColor: "#EEDAFF" }}
              >
                <TableCell style={{ display: "flex", alignItems: "center" }}>
                  <ListItemAvatar>
                    <Avatar src={user.avatar} />
                  </ListItemAvatar>
                  {user.fullname}
                </TableCell>
                <TableCell>@{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                <Button onClick={handleClickOpen} style={{ borderRadius: "50px"}}>
      <DeleteIcon
                      style={{ color: "#240046" }}
                    />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Seguro que quieres ELIMINAR a Usuaria?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={() => handleClick(user._id)}>Eliminar</Button>
        </DialogActions>
      </Dialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={newData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
