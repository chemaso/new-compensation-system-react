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
import { getRoles, deleteRole } from "../../../actions/roles";
import { useAccount } from "../../../hooks/user";
import { t } from '../../../i18n'

const Roles = ({
  children,
  logOut,
  account,
  getRolesList,
  removeRole,
  roles,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [filter, setFilter] = useState('');
  const [filterLoading, setFilterLoading] = useState(false);

  const { decrypt } = useAccount();

  const user = decrypt(account?.user);

  useEffect(() => {
    setLoading(true);
    getRolesList(user?.token, 0, 5, filter).finally(() => setLoading(false));
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filters = [
    {
      id: "name",
      label:  t('roles.name',"Name"),
      maxLength: 50,
      type: 'text',
    },
  ];
  const headCells = [
    {
      id: "id",
      label: t("roles.id", "ID"),
    },
    { id: "name", label: t("roles.name", "Name") },
    { id: "actions", label: t("roles.actions", "Actions") },
  ];
  const handleFilter = (form) => {
    setFilterLoading(true)
    const filterValue = form.name || ''
    setFilter(filterValue)
    const page = roles?.number;
    const size = roles?.size;
    getRolesList(user?.token, page, size, filterValue)
      .then(() => {
        setFilterLoading(false)
        setFilterOpen(false)
      });
  };
  const rows = roles?.content?.map((item) => {
    return {
      id: item.id,
      name: item.name,
      actions: true,
    };
  });

  const handleTableChange = (values) => {
    const page = values.page;
    const size = values.size || roles.size;
    getRolesList(user?.token, page, size, filter);
  };

  const handleDeleteRow = () => {
    setOpenDelete(false);
    removeRole(user?.token, deleteId).then(() =>
      getRolesList(user?.token, 0, roles.size, filter)
    );
  };
  return (
    <>
      <Helmet title={t("roles.title", "Roles")} />
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
                  title={t("roles.edit", "Edit")}
                  arrow
                  onClick={() =>
                    history.replace(`/security/role/index/${values.id}`)
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
                <Tooltip title={t("roles.delete", "Delete")} arrow>
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
                    {t("roles.filter", "Filter")}
                  </Button>
                  <Button
                    endIcon={<AddIcon />}
                    onClick={() => history.replace("/security/role/index/add")}
                    style={{ color: "rgb(255, 96, 13)", fontWeight: "bold" }}
                  >
                    {t("roles.addNew", "Add New")}
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <DataTable
                  rows={rows || []}
                  headCells={headCells}
                  size={roles.size || 0}
                  page={roles.number || 0}
                  sortable={false}
                  onTableChange={handleTableChange}
                  total={roles.totalElements || 0}
                  totalPages={roles.totalPages || 0}
                  lastPage={roles.last}
                  firstPage={roles.first}
                  renderActions={handleRenderActions}
                />
              </Grid>
              <DataViewFilter
                onFilter={handleFilter}
                filterOpen={filterOpen}
                loading={filterLoading}
                setFilterOpen={setFilterOpen}
                filters={filters}
              />
              <NotificationsModal
                open={openDelete}
                handleModal={setOpenDelete}
                content="Are you sure you want to delete the role?"
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
  roles: state?.roles?.roles,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getRolesList: getRoles,
      removeRole: deleteRole,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
