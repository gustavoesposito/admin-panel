"use client";
import React, { useState, useEffect, ReactNode } from "react";

import axios from "axios";

import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  TextField,
  TablePagination,
  TableBody,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  styled,
  Button,
} from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";
import { Block, CheckCircleOutline } from "@mui/icons-material";
import Logout from "@mui/icons-material/Logout";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Tag from "@/components/Tag/Tag";
import PopoverSortOptions from "@/components/PopOver/PopOver";

import styles from "./UserManagement.module.scss";
import { useAppContext } from "@/context/StatusContext";
import {
  DataGrid,
  GridToolbar,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import FilterPanel from "@/components/FilterPainel/FilterPainel";

enum UserStatus {
  Ativo = "Ativo",
  Inativo = "Inativo",
}

interface User {
  id: number;
  name: string;
  phone: string;
  registrationDate: string;
  status: UserStatus;
}

export default function UserManagement() {
  const { userStatus, toggleStatus } = useAppContext();

  const [profileMenuAnchorEl, setProfileMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [value, setValue] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [orderBy, setOrderBy] = useState("");
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const options: string[] = ["Ativar", "Inativar"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<User[]>(
          "https://38375370-103e-44f9-ba50-67c60bff12f7.mock.pstmn.io/users"
        );

        setUsers(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "There was an error fetching the users!",
            error.message
          );
        } else {
          console.error("An unexpected error occurred", error);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredUsers(users);
    }
  }, [users, searchTerm]);

  const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    let updatedUsers =
      searchTerm.length >= 3
        ? users.filter(
          (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone.includes(searchTerm) ||
            user.id.toString().includes(searchTerm)
        )
        : users;

    setFilteredUsers(sortUsers(updatedUsers, orderBy));
  }, [users, orderBy, searchTerm]);

  function sortUsers(users: User[], orderBy: string): User[] {
    switch (orderBy) {
      case "Nome":
        return [...users].sort((a, b) => a.name.localeCompare(b.name));
      case "ID":
        return [...users].sort((a, b) => a.id - b.id);
      case "Telefone":
        return [...users].sort((a, b) => a.phone.localeCompare(b.phone));
      case "Data de cadastro":
        return [...users].sort((a, b) => {
          const dateA = new Date(
            a.registrationDate.split("/").reverse().join("-")
          ).getTime();
          const dateB = new Date(
            b.registrationDate.split("/").reverse().join("-")
          ).getTime();
          return dateA - dateB;
        });
      case "Status":
        return [...users].sort((a, b) => a.status.localeCompare(b.status));
      default:
        return users;
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length >= 3) {
      const lowercasedValue = value.toLowerCase();
      setFilteredUsers(
        users.filter(
          (user) =>
            user.name.toLowerCase().includes(lowercasedValue) ||
            user.phone.includes(value) ||
            user.id.toString().includes(value)
        )
      );
    } else {
      setFilteredUsers(users);
    }
  };

  const handleUserMenu = (
    event: React.MouseEvent<HTMLElement>,
    userId: number
  ) => {
    setUserMenuAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleClose = () => {
    setProfileMenuAnchorEl(null);
    setUserMenuAnchorEl(null);
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenFilterPanel = () => {
    setIsFilterPanelOpen(true);
  };

  const toggleUserStatus = (userId: number) => {
    toggleStatus(userId);

    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          const newStatus =
            user.status === UserStatus.Ativo
              ? UserStatus.Inativo
              : UserStatus.Ativo;
          return { ...user, status: newStatus };
        }
        return user;
      })
    );
  };

  return (
    <div className={styles.userManagementContainer}>
      <header className={styles.topMenu}>
        <div className={styles.logo}>LOGO</div>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="Clientes" />
          <Tab label="Endereços" />
          <Tab label="Entregas" />
        </Tabs>
        <div className={styles.profile}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-account"
            aria-haspopup="true"
            onClick={handleProfileMenu}
            color="inherit"
          >
            <Avatar sx={{ bgcolor: "secondary.main" }} src="/perfil.png" />
          </IconButton>
          <Menu
            id="menu-account"
            anchorEl={profileMenuAnchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(profileMenuAnchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>

              <ListItemText primary="Perfil" />
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>

              <ListItemText primary="Sair" />
            </MenuItem>
          </Menu>
        </div>
      </header>

      <main className={styles.body}>
        <div className={styles.usersTitle}>Usuários</div>

        <div className={styles.filters}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              gap: 2,
              padding: 2,
            }}
          >
            <TextField
              size="small"
              label="Pesquisar por ID ou nome ou telefone..."
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ minWidth: "350px", width: { xs: "100%", sm: "auto" } }}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", sm: "row" },
                width: { xs: "100%", sm: "auto" },
                justifyContent: "space-between",
                gap: { xs: 1, sm: 2 },
              }}
            >
              <PopoverSortOptions title="Ordenar por">
                <RadioGroup
                  aria-label="order-by"
                  name="order-by-group"
                  value={orderBy}
                  onChange={(e) => setOrderBy(e.target.value)}
                >
                  {["ID", "Nome", "Telefone", "Data de cadastro", "Status"].map(
                    (option) => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={
                          <Radio
                            sx={{
                              "&.Mui-checked": {
                                color: "purple",
                              },
                            }}
                          />
                        }
                        label={option.charAt(0).toUpperCase() + option.slice(1)}
                        sx={{
                          m: "4px",
                          "& .MuiTypography-root": {
                            marginLeft: "6px",
                          },
                        }}
                      />
                    )
                  )}
                </RadioGroup>
              </PopoverSortOptions>

              <PopoverSortOptions title="Filtrar"></PopoverSortOptions>

              <Button onClick={handleOpenFilterPanel}>Filtrar</Button>
            </Box>

            {isFilterPanelOpen && <FilterPanel />}
          </Box>

          <div className={styles.usersManagement}>
            {value === 0 && (
              <>
                <TableContainer component={Paper} className={styles.userTable}>
                  <Table sx={{ width: "100%" }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell
                          sx={{
                            display: { xs: "none", sm: "table-cell" },
                          }}
                        >
                          Telefone
                        </TableCell>
                        <TableCell
                          sx={{
                            display: { xs: "none", sm: "table-cell" },
                          }}
                        >
                          Data de cadastro
                        </TableCell>{" "}
                        <TableCell>Status</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow
                          key={user?.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{user?.id}</TableCell>
                          <TableCell>{user?.name}</TableCell>
                          <TableCell
                            sx={{
                              display: { xs: "none", sm: "table-cell" },
                            }}
                          >
                            {user?.phone}
                          </TableCell>
                          <TableCell
                            sx={{
                              display: { xs: "none", sm: "table-cell" },
                            }}
                          >
                            {user?.registrationDate}
                          </TableCell>
                          <TableCell>
                            <Tag
                              theme={
                                user.status === "Ativo"
                                  ? "positive"
                                  : "negative"
                              }
                            >
                              {user?.status}
                            </Tag>
                          </TableCell>

                          <TableCell>
                            <div className={styles.iconMenu}>
                              <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={
                                  Boolean(userMenuAnchorEl)
                                    ? "long-menu"
                                    : undefined
                                }
                                aria-expanded={
                                  Boolean(userMenuAnchorEl) ? "true" : undefined
                                }
                                aria-haspopup="true"
                                onClick={(event) =>
                                  handleUserMenu(event, user.id)
                                }
                              >
                                <MoreVertIcon />
                              </IconButton>
                              <Menu
                                id="long-menu"
                                MenuListProps={{
                                  "aria-labelledby": "long-button",
                                }}
                                anchorEl={userMenuAnchorEl}
                                open={
                                  Boolean(userMenuAnchorEl) &&
                                  selectedUserId === user.id
                                }
                                onClose={handleClose}
                              >
                                {options.map((option) => {
                                  let icon;
                                  let iconColor;
                                  let isDisabled = false;

                                  if (option === "Ativar") {
                                    icon = (
                                      <CheckCircleOutline
                                        style={{ color: "#228340" }}
                                      />
                                    );
                                    iconColor = "#228340";
                                    isDisabled = user.status === "Ativo";
                                  } else if (option === "Inativar") {
                                    icon = (
                                      <Block style={{ color: "#ea4356" }} />
                                    );
                                    iconColor = "#ea4356";
                                    isDisabled = user.status === "Inativo";
                                  }

                                  return (
                                    <MenuItem
                                      key={option}
                                      onClick={() => {
                                        toggleUserStatus(user.id);
                                        handleClose();
                                      }}
                                      disabled={isDisabled}
                                    >
                                      <ListItemIcon>{icon}</ListItemIcon>
                                      <ListItemText primary={option} />
                                    </MenuItem>
                                  );
                                })}
                              </Menu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={users.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            )}
          </div>

          {value === 1 && <div>Conteúdo para Endereços</div>}
          {value === 2 && <div>Conteúdo para Entregas</div>}
        </div>
      </main>
    </div>
  );
}
