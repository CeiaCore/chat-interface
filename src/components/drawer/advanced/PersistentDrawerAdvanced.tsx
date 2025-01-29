import { useContext, useEffect, useState } from "react";
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
  Tooltip,
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
import { HiMenuAlt1, HiOutlineFolderOpen } from "react-icons/hi";
import {
  TbBooks,
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftCollapseFilled,
} from "react-icons/tb";
import {
  IoChevronBackOutline,
  IoClose,
  IoNotificationsOutline,
} from "react-icons/io5";
import { GrAppsRounded } from "react-icons/gr";
import styles from "./PersistentDrawerAdvanced.module.css";
import { PiBooks, PiChatTeardropText } from "react-icons/pi";

import logodrawer from "../../../assets/logos/logodrawer.png";
import { ContextChat } from "../../../context/ChatContext";
import useGetAll from "../../../hooks/chat/useGetAll";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useDeleteChat from "../../../hooks/chat/useDeleteChat";
import useGetAllMethod from "../../../hooks/chat/useGetAllMethod";
import { ContextAuth } from "../../../context/AuthContext";
import { deepOrange } from "@mui/material/colors";
import { CgAddR } from "react-icons/cg";
import { TiFlowChildren } from "react-icons/ti";
import PdfReference from "./references/PdfReference";
import LinkReference from "./references/LinkReference";
import DocReference from "./references/DocReference";
import DBReference from "./references/DBReference";
import CSVReference from "./references/CSVReference";
import { useGetAllNotification } from "../../../hooks/notification/useGetAllNotification";
import PdfWebReference from "./references/PdfWebReference";

const drawerWidth = 260;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
  openReference?: boolean;
}>(({ theme, open, openReference }) => ({
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
  setOpenReference: (value: boolean) => void;
  openReference: boolean;
  handleLogout: () => void;
}

export default function PersistentDrawerAdvanced({
  children,
  openReference,
  setOpenReference,
  handleLogout,
}: PersistentDrawerLeftProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const { deleteChat } = useDeleteChat();
  const { getData } = useGetAllMethod();
  const { stateAuth } = useContext(ContextAuth) || {};
  const { notifications } = useGetAllNotification();

  const navigate = useNavigate();

  const { stateChat } = useContext(ContextChat) || {};
  // const { keycloak } = useKeycloak();

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

  const handleLogoutFunction = () => {
    handleMoreOptionsMenuClose();
    handleLogout();

    try {
      // keycloak.logout();
    } catch (e) {
      console.log(e);
    }
  };
  const params = useLocation();

  useEffect(() => {
    if (params.pathname.includes("/gpts/edit")) {
      setOpen(false);
    }
  }, [params.pathname]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        style={{ boxShadow: "none", backgroundColor: "transparent" }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          {/* <Link to="/gpts">
            <div className={styles.model_identity}>
              <img className={styles.model_image} src={"/teste.png"} />
              <h2 style={{ color: "#333" }}>Dalle 2</h2>
            </div>
          </Link> */}
          {params.pathname.includes("/gpts/edit") ? (
            <Link to="/gpts">
              <IconButton color="inherit" edge="start">
                <IoChevronBackOutline size={25} color="#333" />
              </IconButton>
            </Link>
          ) : (
            <IconButton
              color="inherit"
              onClick={toggleDrawer}
              edge="start"
              sx={{ mr: 2, display: open ? "none" : "inline-flex" }}
            >
              <HiMenuAlt1 color="#7B7B7B" />
            </IconButton>
          )}

          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}></Typography>
          {/* Ícone de Notificações com Menu */}
          <IconButton
            sx={{
              backgroundColor: "#f7f7f7",
            }}
            color="inherit"
            onClick={handleNotificationsMenuOpen}
          >
            <Badge
              variant="dot"
              badgeContent={notifications.length}
              color="error"
            >
              <IoNotificationsOutline size={20} color="#707070" />
            </Badge>
          </IconButton>
          <CustomMenu
            anchorEl={notificationsAnchorEl}
            open={Boolean(notificationsAnchorEl)}
            onClose={handleMenuClose}
            keepMounted
            PaperProps={{
              style: {
                borderRadius: "15px", // Adiciona borda arredondada
                width: "320px",
                boxShadow:
                  " rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Reduz a sombra
              },
            }}
          >
            {notifications?.length ? (
              notifications.map((notification) => (
                <div
                  style={{
                    padding: "10px 20px 10px 20px",
                    borderBottom: "1px solid #c9c9c9",
                  }}
                >
                  <Box>
                    <p
                      style={{
                        fontSize: "1rem",
                        marginTop: "5px",
                        fontWeight: 600,
                        fontFamily: "Inter",
                        marginBottom: "5px",
                        margin: 0,
                      }}
                    >
                      {notification.title}
                    </p>
                    <p
                      style={{
                        fontSize: ".875rem",
                        marginTop: "5px",
                        fontFamily: "Inter",
                        lineHeight: "1.5",
                        marginBottom: "5px",
                        fontWeight: "400",
                        margin: 0,
                        color: "rgb(48, 55, 65)",
                      }}
                    >
                      {notification.description}
                    </p>
                    <p
                      style={{
                        fontSize: ".7rem",
                        marginTop: "15px",
                        fontFamily: "Inter",
                        marginBottom: "15px",
                        margin: 0,
                        color: "rgb(110, 110, 110)",
                      }}
                    >
                      {new Intl.DateTimeFormat("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      }).format(new Date(notification.date))}
                    </p>
                  </Box>
                </div>
              ))
            ) : (
              <MenuItem onClick={handleMenuClose}>Nenhuma notificação</MenuItem>
            )}
          </CustomMenu>
          {/* Ícone de Perfil com Menu */}
          <IconButton
            sx={{ ml: 0.5 }}
            color="inherit"
            onClick={handleProfileMenuOpen}
          >
            <Avatar
              sx={{
                bgcolor: deepOrange[500],
                width: "30px",
                height: "30px",
              }}
            >
              {stateAuth?.user &&
                stateAuth?.user?.email &&
                stateAuth?.user?.email[0].toLocaleUpperCase()}
            </Avatar>
          </IconButton>
          <CustomMenu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleMenuClose}
            keepMounted
            PaperProps={{
              style: {
                borderRadius: "15px", // Adiciona borda arredondada
                boxShadow:
                  " rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Reduz a sombra
              },
            }}
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
                handleLogoutFunction();
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
            backgroundColor: "#fff",
            border: "none",
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;",
          },
        }}
      >
        <DrawerHeader style={{ height: "20px" }}>
          {/* <img style={{ height: "15px" }} src={logodrawer} /> */}
          <IconButton onClick={toggleDrawer}>
            {theme.direction === "ltr" ? (
              <TbLayoutSidebarLeftCollapse color="#7B7B7B" />
            ) : (
              <TbLayoutSidebarLeftCollapseFilled />
            )}
          </IconButton>
        </DrawerHeader>
        <div style={{ overflow: "auto", position: "relative" }}>
          <ul className={styles.chats_options}>
            <Link
              onClick={() => {
                setOpenReference(false);
              }}
              to="/"
            >
              <li className={styles.li}>
                <PiChatTeardropText
                  style={{
                    marginLeft: "5px",
                    marginRight: "5px",
                    height: "20px",
                    width: "20px",
                    color: "#333",
                  }}
                />
                <p>Nova conversa</p>
              </li>
            </Link>
            <Link to="/gpts">
              <li
                onClick={() => {
                  setOpenReference(false);
                }}
                className={styles.li}
                style={{
                  backgroundColor: String(params.pathname).includes("gpts")
                    ? "rgb(236, 236, 236)"
                    : "",
                }}
              >
                <GrAppsRounded
                  style={{
                    marginLeft: "5px",
                    height: "18px",
                    width: "18px",
                    marginRight: "7px",
                    color: "#6A6A6A",
                  }}
                />
                <p>Agentes</p>
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
          <p
            style={{
              marginLeft: "15px",
              marginRight: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            className={styles.date_label}
          >
            Projetos
            <div>
              <Tooltip title="Resposta satisfatória" arrow placement="top">
                <CgAddR className={styles.add_project} />
              </Tooltip>
            </div>
          </p>
          <ul className={styles.chats_options}>
            <Link to="/">
              <li
                onClick={() => {
                  setOpenReference(false);
                }}
                className={styles.li}
              >
                <HiOutlineFolderOpen
                  style={{
                    marginLeft: "5px",
                    height: "20px",
                    width: "20px",
                    color: "#6A6A6A",
                  }}
                />
                <p>Teste</p>
              </li>
            </Link>
          </ul>
          <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />

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
                      <Link
                        onClick={() => {
                          setOpenReference(false);
                        }}
                        to={`/c/${element.chat_id}`}
                      >
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
                      <Link
                        onClick={() => {
                          setOpenReference(false);
                        }}
                        to={`/c/${element.chat_id}`}
                      >
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
                      </Link>
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
                    <Link
                      onClick={() => {
                        setOpenReference(false);
                      }}
                      to={`/c/${element.chat_id}`}
                    >
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
                    </Link>
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
      <Main open={open} openReference={openReference}>
        <DrawerHeader />
        {children}
      </Main>

      <Drawer
        variant="persistent"
        anchor="right"
        open={openReference}
        sx={{
          width: openReference ? 380 : "",
        }}
      >
        <DrawerHeader style={{ height: "20px" }}>
          <p style={{ fontWeight: 700, fontSize: "0.9rem" }}>Fontes</p>
          <IconButton
            onClick={() => {
              setOpenReference(false);
            }}
          >
            <IoClose color="#7B7B7B" />
          </IconButton>
        </DrawerHeader>
        <div
          className={styles.container_reference}
          style={{ position: "relative" }}
        >
          <Divider style={{ marginBottom: "10px" }} />
          <ul className={openReference && `${styles.box_reference}`}>
            {stateChat?.references.map((reference) => (
              <>
                <>
                  {reference.source_type === "pdf" && (
                    <PdfReference reference={reference} />
                  )}
                </>
                <>
                  {reference.source_type === "web" && (
                    <LinkReference reference={reference} />
                  )}
                </>
                <>
                  {reference.source_type === "pdf-url" && (
                    <PdfWebReference reference={reference} />
                  )}
                </>
                <>
                  {reference.source_type === "doc" && (
                    <DocReference reference={reference} />
                  )}
                </>
                <>
                  {reference.source_type === "db" && (
                    <DBReference reference={reference} />
                  )}
                </>
                <>
                  {reference.source_type === "csv" && (
                    <CSVReference reference={reference} />
                  )}
                </>
              </>
            ))}
          </ul>
        </div>
      </Drawer>
    </Box>
  );
}
