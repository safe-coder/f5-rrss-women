import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { Pagination } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";

export default function UserList() {
  const [data, setData] = useState([]);
  const { auth } = useSelector((state) => state);

  console.log(data);
  console.log(auth);

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
  };

  const newData = data.filter((user) => {
    return !user.fullname.includes('developer') 
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

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 500 }}>
      <h2
        style={{
          backgroundColor: "#FF9E00",
          color: "#240046",
          width: "fit-content",
          padding: ".5rem",
          marginBottom: ".8rem",
        }}
      >
        Lista de Usuarias
      </h2>
      <Grid item xs={12} md={6}>
        <List>
          {newData.map((user) => (
            <ListItem
              style={{
                backgroundColor: "#EEDAFF",
                borderRadius: "50px",
                marginBottom: "1rem",
              }}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <Button variant="text" onClick={() => handleClick(user._id)}>
                    <DeleteIcon fontSize="large" style={{ color: "#240046" }} />
                  </Button>
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar src={user.avatar} />
              </ListItemAvatar>
              <p>@{user.username} </p>
            </ListItem>
          ))}
        </List>
        <Pagination
          count={5}
          style={{
            backgroundColor: "#EEDAFF",
            borderRadius: "50px",
            display: "flex",
            justifyContent: "center",
          }}
        />
      </Grid>
    </Box>
  );
}
