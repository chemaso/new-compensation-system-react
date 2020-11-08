import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { flatMap, isNil } from "lodash";
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
import { t } from '../../../i18n'

const User = ({
  account,
  users,
  departments,
  deleteUsers,
  fetchRoles,
  fetchUsers,
  fetchDepartments,
}) => {
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [filter, setFilter] = useState({});
  const [filterLoading, setFilterLoading] = useState(false);
  const [departmentsFilter, setDepartments] = useState([]);
  const [rolesFilter, setRoles] = useState([]);

  const { decrypt } = useAccount();

  const user = decrypt(account?.user);

  useEffect(() => {
    fetchDepartments(user?.token, 0, 0, {}, true).then((res) => {
      const d = res?.map((item) => ({
        name: `${item.id} - ${item.name}`,
        id: item.id,
      }));
      setDepartments(d);
    });
    fetchRoles(user?.token, 0, 0, {}, true).then((r) => setRoles(r));
    setLoading(true);
    fetchUsers(user?.token, 0, 5, filter).finally(() => setLoading(false));
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filters = [
    {
      id: "dni",
      type: "text",
      label:  t('users.dni',"Identification"),
      maxLength: 20,
    },
    {
      id: "username",
      type: "text",
      noSpaces: true,
      label: t('users.username',"Username"),
      maxLength: 50,
    },
    {
      id: "name",
      type: "text",
      label: t('users.name',"Name"),
      maxLength: 100,
    },
    {
      id: "email",
      type: "text",
      noSpaces: true,
      label: t('users.email',"Email"),
      maxLength: 50,
    },
    {
      id: "profile",
      type: "select",
      options: rolesFilter,
      label: t('users.profile',"Profile"),
    },
    {
      id: "department",
      type: "select",
      options: departmentsFilter,
      label: t('users.department',"Department"),
    },
  ];

  const headCells = [
    {
      id: "id",
      label: "ID",
    },
    { id: "name", label: t('users.name',"Name") },
    { id: "username", label: t('users.username',"Username") },
    { id: "email", label: t('users.email',"Email") },
    { id: "actions", label: t('users.actions',"Actions"), },
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
      fetchUsers(user?.token, 0, 5, filter)
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
                  title={t('users.edit',"Edit")}
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
                <Tooltip title={t('users.delete',"Delete")} arrow>
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
                    {t('users.filter',"Filter")}
                  </Button>
                  <Button
                    endIcon={<AddIcon />}
                    onClick={() => history.replace("/security/user/index/add")}
                    style={{ color: "rgb(255, 96, 13)", fontWeight: "bold" }}
                  >
                    {t('users.addNew',"Add New")}
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
