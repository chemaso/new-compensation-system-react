import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { flatMap, isEmpty, isNil } from "lodash";
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
import { getRoles } from '../../../actions/roles'
import { useAccount } from "../../../hooks/user";

function createData(id, name, fat, actions) {
  return { id, name, fat, actions };
}

const rows = [
  createData(4324, "Pedro Perez", 305, 3.7, 67, 4.3, true),
  createData(42312, "Jose Lue", 452, 25.0, 51, 4.9, true),
  createData(5345, "Carlos Lc", 262, 16.0, 24, 6.0, true),
  createData(54354, "Joua Chas", 159, 6.0, 24, 4.0, true),
  createData(654645, "Gingerbread Pel", 356, 16.0, 49, 3.9, true),
  createData(55234, "Honeycomb Cas", 408, 3.2, 87, 6.5, true),
  createData(42341, "Cash Jonh", 237, 9.0, 37, 4.3, true),
  createData(7657, "Jelly Pepe", 375, 0.0, 94, 0.0, true),
  createData(324, "Carlos Julio", 518, 26.0, 65, 7.0, true),
  createData(8789, "Daniel Marque", 392, 0.2, 98, 0.0, true),
  createData(8679, "Marcos Paz", 318, 0, 81, 2.0, true),
  createData(1235, "Daniel Ortega", 360, 19.0, 9, 37.0, true),
  createData(474, "Oreo Loreo", 437, 18.0, 63, 4.0, true),
];

const Roles = ({
  children,
  logOut,
  account,
  getRolesList,
  roles,
  ...rest
}) => {

  const { decrypt } = useAccount();
  
  const user = decrypt(account?.user);

  useEffect(() => {
    setLoading(true)
    getRolesList(user?.token, 0, 5)
      .finally(() => setLoading(false))
  }, [])

  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const filters = [
    {
      id: "name",
      label: "Name",
      maxLength: 50,
    },
  ];
  const headCells = [
    {
      id: "id",
      label: "ID",
    },
    { id: "name", label: "Name" },
    { id: "actions", label: "Actions" },
  ];
  const handleFilter = (form) => {
    console.log(form);
  };
  const rows = roles?.content?.map((item) => {
    return {
      id: item.id,
      name: item.name,
      actions: true,
    }
  })

  const handleTableChange = (values) => {
    const page = values.page || roles.page
    const size = values.size || roles.size
    getRolesList(user?.token, page, size)
  }

  return (
    <>
      <Helmet title="Roles" />
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
                <Tooltip title="Delete" arrow>
                  <IconButton size="small" onClick={() => setOpenDelete(true)}>
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
                    onClick={() => history.replace("/security/role/index/add")}
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
                  size={roles.size || 0}
                  page={roles.page || 0}
                  sortable={false}
                  onTableChange={handleTableChange}
                  total={roles.numberOfElements || 0}
                  totalPages={roles.totalPages || 0}
                  lastPage={roles.last}
                  firstPage={roles.first}
                  renderActions={handleRenderActions}
                />
              </Grid>
              <DataViewFilter
                onFilter={handleFilter}
                filterOpen={filterOpen}
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
                    action: () => {
                      setOpenDelete(false);
                    },
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
  return bindActionCreators({
    getRolesList: getRoles,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
