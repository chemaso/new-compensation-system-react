import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { flatMap, isEmpty, isNil, get as _get } from "lodash";
import MasterLayout from "../../../components/layout/MasterLayout";
import { DataViewSkeleton } from "../../../components/common/Skeletons";
import DataViewFilter from "../../../components/common/dataView/filter";
import { Grid, Tooltip, Button, IconButton } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import AddIcon from "@material-ui/icons/Add";
import DataTable from "../../../components/common/dataView/DataTable";
import NotificationsModal from "../../../components/common/NotificationsModal";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Helmet from "../../../components/common/Helmet";
import { useAccount } from "../../../hooks/user";
import { getDepartments } from "../../../actions/departments";
import { getUsers, deleteUser } from "../../../actions/users";
import { getRoles } from "../../../actions/roles";

const User = ({
  children,
  logOut,
  account,
  setPermissions,
  permissions,
  users,
  roles,
  departments,
  deleteUsers,
  fetchRoles,
  fetchUsers,
  fetchDepartments,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [filter, setFilter] = useState({});
  const [filterLoading, setFilterLoading] = useState(false);

  const { decrypt } = useAccount();

  const user = decrypt(account?.user);

  useEffect(() => {
    fetchDepartments(user?.token, 0, 0, {}, true);
    fetchRoles(user?.token, 0, 0, {}, true);
    setLoading(true);
    fetchUsers(user?.token, 0, 5, filter).finally(() => setLoading(false));
  }, []);
  const depts  = (isNil(departments) || isEmpty(departments)) ? [] : departments?.map((item) => ({
    name: `${item.id} - ${item.name}`,
    id: item.id,
  }))
  const filters = [
    {
      id: "dni",
      type: "text",
      label: "Identification",
      maxLength: 20,
    },
    {
      id: "username",
      type: "text",
      noSpaces: true,
      label: "Username",
      maxLength: 50,
    },
    {
      id: "name",
      type: "text",
      label: "Name",
      maxLength: 100,
    },
    {
      id: "email",
      type: "text",
      noSpaces: true,
      label: "Email",
      maxLength: 50,
    },
    {
      id: "profile",
      type: "select",
      options: roles,
      label: "Profile",
    },
    {
      id: "department",
      type: "select",
      options: depts,
      label: "Department",
    },
  ];

  const headCells = [
    {
      id: "id",
      label: "ID",
    },
    { id: "name", label: "Name" },
    { id: "username", label: "Username" },
    { id: "email", label: "Email" },
    { id: "actions", label: "Actions" },
  ];
  const handleFilter = (form) => {
    setFilterLoading(true);
    setFilter(form);
    const page = users?.number;
    const size = users?.numberOfElements < 5 ? 5 : users?.numberOfElements;
    fetchUsers(user?.token, page, size, form).then(() => {
      setFilterLoading(false);
      setFilterOpen(false);
    });
  };
  const rows = users?.content?.map((item) => {
    return {
      id: item.id,
      name: item.name,
      username: item.username,
      email: item.email,
      actions: true,
    };
  });

  const handleTableChange = (values) => {
    const page = values.page;
    const size = values.size || users.size;
    fetchUsers(user?.token, page, size, filter);
  };

  const handleDeleteRow = () => {
    setOpenDelete(false);
    deleteUsers(user?.token, deleteId).then(() =>
      fetchUsers(user?.token, 0, users.size, filter)
    );
  };
  return (
    <>
      <Helmet title="User" />
      <MasterLayout
        loading={false}
        render={({ menuItems, history }) => {
          const handleRenderActions = ({ values }) => {
            const path = history.location.pathname;
            const current = flatMap(menuItems, "subcontent").find(
              (val) => path.indexOf(val.route) !== -1
            ) || { permissions: [] };
            let render = [null];
            const currentPermissions = current.permissions;
            const canEdit = currentPermissions?.edit;
            const canDelete = currentPermissions?.delete;
            if (canEdit) {
              render = [
                <Tooltip
                  title="Edit"
                  arrow
                  onClick={() =>
                    history.replace(`/security/user/index/${values.id}`)
                  }
                >
                  <IconButton size="small" style={{ paddingRight: 10 }}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>,
              ];
            }
            if (canDelete) {
              render = [
                ...render,
                <Tooltip title="Delete" arrow>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setDeleteId(values.id);
                      setOpenDelete(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>,
              ];
            }
            if (isNil(render[0])) {
              render = "-";
            }
            return <Grid container>{render}</Grid>;
          };
          return loading ? (
            <DataViewSkeleton />
          ) : (
            <Grid container style={{ marginRight: 20 }}>
              <Grid style={{ marginBottom: 10 }} item xs={12}>
                <Grid justify="space-between" container>
                  <Button
                    endIcon={<FilterListIcon />}
                    onClick={() => setFilterOpen(true)}
                    style={{ color: "rgb(255, 96, 13)", fontWeight: "bold" }}
                  >
                    Filter
                  </Button>
                  <Button
                    endIcon={<AddIcon />}
                    onClick={() => history.replace("/security/user/index/add")}
                    style={{ color: "rgb(255, 96, 13)", fontWeight: "bold" }}
                  >
                    Add New
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <DataTable
                  rows={rows || []}
                  headCells={headCells}
                  size={users.numberOfElements || 0}
                  page={users.number || 0}
                  sortable={false}
                  onTableChange={handleTableChange}
                  total={users.totalElements || 0}
                  totalPages={users.totalPages || 0}
                  lastPage={users.last}
                  firstPage={users.first}
                  renderActions={handleRenderActions}
                />
              </Grid>
              {users && departments && (
                <DataViewFilter
                  onFilter={handleFilter}
                  filterOpen={filterOpen}
                  loading={filterLoading}
                  setFilterOpen={setFilterOpen}
                  filters={filters}
                />
              )}
              <NotificationsModal
                open={openDelete}
                handleModal={setOpenDelete}
                content="Are you sure you want to delete the user?"
                title="Please Confirm"
                buttons={[
                  {
                    label: "Cancel",
                    style: "secondary",
                    action: () => {
                      setOpenDelete(false);
                    },
                  },
                  {
                    label: "Continue",
                    style: "primary",
                    action: handleDeleteRow,
                  },
                ]}
              />
            </Grid>
          );
        }}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  account: state.account,
  departments: state?.departments?.departments,
  roles: state?.roles?.roles,
  users: state?.users?.users,
  permissions: state?.permissions?.data,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchUsers: getUsers,
      fetchRoles: getRoles,
      deleteUsers: deleteUser,
      fetchDepartments: getDepartments,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
