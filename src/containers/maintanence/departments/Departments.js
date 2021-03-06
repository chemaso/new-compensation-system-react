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
import { getDepartments, deleteDepartment } from '../../../actions/departments'
import { useAccount } from "../../../hooks/user";
import { t } from '../../../i18n'

const Departments = ({
  children,
  logOut,
  account,
  removeDepartment,
  getDepartmentsList,
  departments,
}) => {

  const { decrypt } = useAccount();
  
  const user = decrypt(account?.user);

  useEffect(() => {
    setLoading(true)
    getDepartmentsList(user?.token, 0, 5)
      .finally(() => setLoading(false))
 // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const filters = [
    {
      id: "name",
      label: t('departments.addDepartment.name',"Name"),
      type: 'text',
      maxLength: 100,
    },
  ];
  const headCells = [
    {
      id: "id",
      label: t('departments.editDepartment.id',"ID"),
    },
    {
      id: "code",
      label: t('departments.editDepartment.code',"Code"),
    },
    { id: "name", label: t('departments.editDepartment.name',"Name") },
    { id: "actions", label: t('departments.actions', "Actions") },
  ];
  const handleFilter = (form) => {
    setFilterLoading(true)
    const page = departments.number
    const size = departments.size
    getDepartmentsList(user?.token, page, size, form.name)
      .finally(() => {
        setFilterLoading(false)
        setFilterOpen(false)
      })
  };
  const rows = departments?.content?.map((item) => {
    return {
      id: item.id,
      name: item.name,
      code: item.code,
      actions: true,
    }
  })

  const handleTableChange = (values) => {
    const page = values.page
    const size = values.size || departments.size
    getDepartmentsList(user?.token, page, size)
  }

  const handleDeleteRow = () => {
    setOpenDelete(false);
    removeDepartment(user?.token, deleteId)
      .then(() =>  getDepartmentsList(user?.token, 0, departments.size)) 
  }
  return (
    <>
      <Helmet title={t('departments.title', 'Departments')}/>
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
                  title={t('departments.edit',"Edit")}
                  arrow
                  onClick={() =>
                    history.replace(`/maintanence/department/index/${values.id}`)
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
                <Tooltip  title={t('departments.delete',"Delete")} arrow>
                  <IconButton size="small" onClick={() => {
                    setDeleteId(values.id)
                    setOpenDelete(true)
                  }}>
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
                     {t('departments.filter',"Filter")}
                  </Button>
                  <Button
                    endIcon={<AddIcon />}
                    onClick={() => history.replace("/maintanence/department/index/add")}
                    style={{ color: "rgb(255, 96, 13)", fontWeight: "bold" }}
                  >
                     {t('departments.addNew',"Add new")}
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <DataTable
                  rows={rows || []}
                  headCells={headCells}
                  size={departments.size || 0}
                  page={departments.number || 0}
                  sortable={false}
                  onTableChange={handleTableChange}
                  total={departments.totalElements || 0}
                  totalPages={departments.totalPages || 0}
                  lastPage={departments.last}
                  firstPage={departments.first}
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
                content={t('departments.deleteModal',"Are you sure you want to delete the Department?")}
                title={t('departments.confirmModal',"Please Confirm")}
                buttons={[
                  {
                    label: t('departments.cancel',"Cancel"),
                    style: "secondary",
                    action: () => {
                      setOpenDelete(false);
                    },
                  },
                  {
                    label: t('departments.continue',"Cancel"),
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
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getDepartmentsList: getDepartments,
    removeDepartment: deleteDepartment,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Departments);
