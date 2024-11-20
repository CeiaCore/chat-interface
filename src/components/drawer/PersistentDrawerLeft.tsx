import { useContext, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  ListItemIcon,
  Badge,
  Menu,
  MenuItem,
  Divider,
  LinearProgress,
  Avatar,
} from "@mui/material";
import {
  Settings,
  ExitToApp,
  Person,
  History,
  MoreHorizOutlined,
  Archive,
  Edit,
  Delete,
} from "@mui/icons-material";
import { HiMenuAlt1 } from "react-icons/hi";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { IoNotificationsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

import styles from "./PersistentDrawerLeft.module.css";
import { PiChatTeardropText } from "react-icons/pi";

import logodrawer from "../../assets/logos/logodrawer.png";
import { ContextChat } from "../../context/ChatContext";
import useGetAll from "../../hooks/chat/useGetAll";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useDeleteChat from "../../hooks/chat/useDeleteChat";
import useGetAllMethod from "../../hooks/chat/useGetAllMethod";
import { useKeycloak } from "@react-keycloak/web";
import { ContextAuth } from "../../context/AuthContext";
import { deepOrange } from "@mui/material/colors";

const drawerWidth = 260;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: open ? 0 : `-${drawerWidth}px`,
  transition: theme.transitions.create(["margin"], {
    easing: open
      ? theme.transitions.easing.easeOut
      : theme.transitions.easing.sharp,
    duration: open
      ? theme.transitions.duration.enteringScreen
      : theme.transitions.duration.leavingScreen,
  }),
}));

interface AppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
  marginLeft: open ? drawerWidth : 0,
  transition: theme.transitions.create(["width", "margin"], {
    easing: open
      ? theme.transitions.easing.easeOut
      : theme.transitions.easing.sharp,
    duration: open
      ? theme.transitions.duration.enteringScreen
      : theme.transitions.duration.leavingScreen,
  }),
}));

const CustomMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    boxShadow: theme.shadows[1], // Define uma sombra mais suave
    maxWidth: 300, // Define largura máxima para o menu de notificações
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: "10px",
  marginRight: "10px",
  padding: theme.spacing(0, 1),
  justifyContent: "space-between",
  ...theme.mixins.toolbar,
}));

interface PersistentDrawerLeftProps {
  children: React.ReactNode;
}

export default function PersistentDrawerLeft({
  children,
}: PersistentDrawerLeftProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const { deleteChat } = useDeleteChat();
  const { getData } = useGetAllMethod();
  const { stateAuth } = useContext(ContextAuth) || {};

  const navigate = useNavigate();

  const { stateChat } = useContext(ContextChat) || {};
  const { keycloak } = useKeycloak();

  const [notificationsAnchorEl, setNotificationsAnchorEl] =
    useState<null | HTMLElement>(null);

  const [moreOptionsAnchorEl, setMoreOptionsAnchorEl] = useState<{
    anchorEl: HTMLElement | null;
    index: number | null;
  }>({
    anchorEl: null,
    index: null,
  });

  const handleMoreOptionsMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setMoreOptionsAnchorEl({ anchorEl: event.currentTarget, index });
  };

  const handleMoreOptionsMenuClose = () => {
    setMoreOptionsAnchorEl({ anchorEl: null, index: null });
  };

  const toggleDrawer = () => setOpen(!open);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleNotificationsMenuOpen = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setProfileAnchorEl(null);
    setNotificationsAnchorEl(null);
  };
  useGetAll({ user_id: stateAuth?.user.user_id });

  // Lista de notificações fictícias com data
  const notifications = [
    // { id: 1, message: "Nova mensagem recebida", date: "2024-11-05 10:15 AM" },
    // {
    //   id: 2,
    //   message: "Atualização do sistema disponível",
    //   date: "2024-11-04 02:30 PM",
    // },
    // {
    //   id: 3,
    //   message: "Reunião agendada para amanhã",
    //   date: "2024-11-03 09:00 AM",
    // },
  ];
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfToday.getDate() - 1);
  const startOfLast7Days = new Date(startOfToday);
  startOfLast7Days.setDate(startOfToday.getDate() - 7);

  const location = useLocation();
  const fullPath = location.pathname;

  const chat_id = fullPath.startsWith("/c") ? fullPath.slice(3) : null;
  const handleDeleteChat = (chat_id: string) => {
    deleteChat({ chat_id: chat_id }).then(() => {
      navigate("/");

      if (stateAuth?.user.user_id) {
        getData({ user_id: stateAuth.user.user_id });
      } else {
        console.error("User ID is undefined.");
      }
    });

    handleMoreOptionsMenuClose();
  };

  const handleLogout = () => {
    handleMoreOptionsMenuClose();

    try {
      keycloak.logout();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        style={{ boxShadow: "none", backgroundColor: "transparent" }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 2, display: open ? "none" : "inline-flex" }}
          >
            <HiMenuAlt1 color="#7B7B7B" />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}></Typography>
          {/* Ícone de Notificações com Menu */}
          <IconButton
            color="inherit"
            disabled={true}
            onClick={handleNotificationsMenuOpen}
          >
            <Badge badgeContent={notifications.length} color="error">
              <IoNotificationsOutline size={20} color="#707070" />
            </Badge>
          </IconButton>
          <CustomMenu
            anchorEl={notificationsAnchorEl}
            open={Boolean(notificationsAnchorEl)}
            onClose={handleMenuClose}
            keepMounted
          >
            <Typography sx={{ px: 2, py: 1, fontWeight: "bold" }}>
              Notificações
            </Typography>
            <Divider />
            {notifications.length ? (
              notifications.map((notification) => (
                <MenuItem key={notification.id} onClick={handleMenuClose}>
                  <Box>
                    <Typography variant="body2">
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {notification.date}
                    </Typography>
                  </Box>
                </MenuItem>
              ))
            ) : (
              <MenuItem onClick={handleMenuClose}>Nenhuma notificação</MenuItem>
            )}
          </CustomMenu>
          {/* Ícone de Perfil com Menu */}
          <IconButton color="inherit" onClick={handleProfileMenuOpen}>
            <Avatar
              sx={{ bgcolor: deepOrange[500], width: "30px", height: "30px" }}
            >
              {stateAuth?.user &&
                stateAuth?.user?.user_name &&
                stateAuth?.user?.user_name[0].toLocaleUpperCase()}
            </Avatar>
          </IconButton>

          <CustomMenu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleMenuClose}
            keepMounted
          >
            <MenuItem disabled={true} onClick={handleMenuClose}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              Perfil
            </MenuItem>
            <MenuItem disabled={true} onClick={handleMenuClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Configurações
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleLogout();
              }}
            >
              <ListItemIcon>
                <ExitToApp fontSize="small" />
              </ListItemIcon>
              Sair
            </MenuItem>
          </CustomMenu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#F9F9F9",
            border: "none",
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;",
          },
        }}
      >
        <DrawerHeader style={{ height: "20px" }}>
          <img style={{ height: "15px" }} src={logodrawer} />
          <IconButton onClick={toggleDrawer}>
            {theme.direction === "ltr" ? (
              <TbLayoutSidebarLeftCollapseFilled color="#7B7B7B" />
            ) : (
              <TbLayoutSidebarLeftCollapseFilled />
            )}
          </IconButton>
        </DrawerHeader>
        <div style={{ overflow: "auto", position: "relative" }}>
          <ul className={styles.chats_options}>
            <Link to="/">
              <li className={styles.li}>
                <PiChatTeardropText
                  style={{
                    marginLeft: "5px",
                    height: "20px",
                    width: "20px",
                    color: "#333",
                  }}
                />
                <p>Novo Chat</p>
              </li>
            </Link>
          </ul>
          <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
          {stateChat?.loading_drawer && (
            <div
              style={{
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              <LinearProgress style={{ opacity: "30%" }} color="inherit" />
            </div>
          )}

          {!stateChat?.loading_drawer && (
            <ul className={styles.chats}>
              <p className={styles.date_label}>Hoje</p>

              {stateChat?.chats_all_info.map((element, index) => (
                <>
                  {element?.create_at &&
                    (typeof element.create_at === "string" ||
                      typeof element.create_at === "number" ||
                      element.create_at instanceof Date) &&
                    new Date(element.create_at) >= startOfToday && (
                      <Link to={`/c/${element.chat_id}`}>
                        <li
                          style={{
                            backgroundColor:
                              chat_id &&
                              String(chat_id) === String(element.chat_id)
                                ? "rgb(236, 236, 236)"
                                : "",
                          }}
                          className={styles.li}
                          key={index}
                        >
                          <History
                            style={{
                              marginLeft: "5px",
                              height: "20px",
                              width: "20px",
                              color: "#9E9E9E",
                            }}
                          />
                          <p className={styles.p_li}>{element.chat_label}</p>
                          <div className={styles.options}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                              }}
                              onClick={(event) =>
                                handleMoreOptionsMenuOpen(event, index)
                              }
                            >
                              <MoreHorizOutlined style={{ height: "20px" }} />
                            </div>

                            <CustomMenu
                              anchorEl={
                                moreOptionsAnchorEl.index === index
                                  ? moreOptionsAnchorEl.anchorEl
                                  : null
                              }
                              open={moreOptionsAnchorEl.index === index}
                              onClose={handleMoreOptionsMenuClose}
                              keepMounted
                            >
                              <MenuItem
                                disabled={true}
                                onClick={handleMoreOptionsMenuClose}
                              >
                                <ListItemIcon>
                                  <Edit fontSize="small" />
                                </ListItemIcon>
                                Renomear
                              </MenuItem>
                              <MenuItem
                                disabled={true}
                                onClick={handleMoreOptionsMenuClose}
                              >
                                <ListItemIcon>
                                  <Archive fontSize="small" />
                                </ListItemIcon>
                                Arquivar
                              </MenuItem>
                              <MenuItem
                                style={{ color: "rgb(255, 74, 74)" }}
                                onClick={() => {
                                  handleDeleteChat(element.chat_id);
                                }}
                              >
                                <ListItemIcon>
                                  <Delete
                                    style={{ color: "rgb(255, 74, 74)" }}
                                    fontSize="small"
                                  />
                                </ListItemIcon>
                                Excluir
                              </MenuItem>
                            </CustomMenu>
                          </div>
                        </li>
                      </Link>
                    )}
                </>
              ))}
              <p className={styles.date_label}>Ontem</p>

              {stateChat?.chats_all_info.map((element, index) => (
                <>
                  {element?.create_at &&
                    (typeof element.create_at === "string" ||
                      typeof element.create_at === "number" ||
                      element.create_at instanceof Date) &&
                    new Date(element.create_at) >= startOfYesterday &&
                    new Date(element.create_at) < startOfToday && (
                      <li className={styles.li} key={index}>
                        <History
                          style={{
                            marginLeft: "5px",
                            height: "20px",
                            width: "20px",
                            color: "#9E9E9E",
                          }}
                        />
                        <p className={styles.p_li}>{element.chat_label}</p>
                        <div className={styles.options}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                            }}
                            onClick={(event) =>
                              handleMoreOptionsMenuOpen(event, index)
                            }
                          >
                            <MoreHorizOutlined style={{ height: "20px" }} />
                          </div>
                          <CustomMenu
                            anchorEl={
                              moreOptionsAnchorEl.index === index
                                ? moreOptionsAnchorEl.anchorEl
                                : null
                            }
                            open={moreOptionsAnchorEl.index === index}
                            onClose={handleMoreOptionsMenuClose}
                            keepMounted
                          >
                            <MenuItem onClick={handleMoreOptionsMenuClose}>
                              <ListItemIcon>
                                <Edit fontSize="small" />
                              </ListItemIcon>
                              Renomear
                            </MenuItem>
                            <MenuItem onClick={handleMoreOptionsMenuClose}>
                              <ListItemIcon>
                                <Archive fontSize="small" />
                              </ListItemIcon>
                              Arquivar
                            </MenuItem>
                            <MenuItem onClick={handleMoreOptionsMenuClose}>
                              <ListItemIcon>
                                <Delete fontSize="small" />
                              </ListItemIcon>
                              Excluir
                            </MenuItem>
                          </CustomMenu>
                        </div>
                      </li>
                    )}
                </>
              ))}
              <p className={styles.date_label}>7 dias anteriores</p>

              {stateChat?.chats_all_info.map((element, index) => (
                <>
                  {(element.create_at === null ||
                    ((typeof element.create_at === "string" ||
                      typeof element.create_at === "number" ||
                      element.create_at instanceof Date) &&
                      new Date(element.create_at) < startOfYesterday)) && (
                    <li className={styles.li} key={index}>
                      <History
                        style={{
                          marginLeft: "5px",
                          height: "20px",
                          width: "20px",
                          color: "#9E9E9E",
                        }}
                      />
                      <p className={styles.p_li}>{element.chat_label}</p>
                      <div className={styles.options}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                          onClick={(event) =>
                            handleMoreOptionsMenuOpen(event, index)
                          }
                        >
                          <MoreHorizOutlined style={{ height: "20px" }} />
                        </div>
                        <CustomMenu
                          anchorEl={
                            moreOptionsAnchorEl.index === index
                              ? moreOptionsAnchorEl.anchorEl
                              : null
                          }
                          open={moreOptionsAnchorEl.index === index}
                          onClose={handleMoreOptionsMenuClose}
                          keepMounted
                        >
                          <MenuItem onClick={handleMoreOptionsMenuClose}>
                            <ListItemIcon>
                              <Edit fontSize="small" />
                            </ListItemIcon>
                            Renomear
                          </MenuItem>
                          <MenuItem onClick={handleMoreOptionsMenuClose}>
                            <ListItemIcon>
                              <Archive fontSize="small" />
                            </ListItemIcon>
                            Arquivar
                          </MenuItem>
                          <MenuItem onClick={handleMoreOptionsMenuClose}>
                            <ListItemIcon>
                              <Delete fontSize="small" />
                            </ListItemIcon>
                            Excluir
                          </MenuItem>
                        </CustomMenu>
                      </div>
                    </li>
                  )}
                </>
              ))}
            </ul>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            fontSize: "12px",
            justifyContent: "center",
            color: "#7D7D7D",
            bottom: 0,
            position: "absolute",
          }}
        >
          v 1
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
