import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getRoleById, putRole } from "../../../actions/roles";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getPermissions } from "../../../actions/permissions";
import MasterLayout from "../../../components/layout/MasterLayout";
import UserForm from "../../../components/common/Form";
import { DataViewSkeleton } from "../../../components/common/Skeletons";
import { Grid, Typography, Button, Divider } from "@material-ui/core";
import { useAccount } from "../../../hooks/user";

import Helmet from "../../../components/common/Helmet";
import CButton from "../../../components/common/ButtonWithLoading";
import { isNil, isEmpty } from "lodash";
import { t } from '../../../i18n'

const formInputs = [
  {
    label: t("roles.editRole.name", "Name"),
    id: "name",
    required: true,
    maxLength: 100,
  },
  {
    label: t("roles.editRole.description", "Description"),
    id: "description",
    required: true,
    maxLength: 100,
  },
  {
    label: t("roles.editRole.permissions", "Permissions"),
    id: "permissions",
    type: "treeview",
  },
];

const EditRole = ({
  children,
  logOut,
  getRole,
  editRole,
  getPermission,
  permissions,
  role,
  account,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});
  const params = useParams();
  const { decrypt } = useAccount();

  const user = decrypt(account?.user);
  useEffect(() => {
    setLoading(true);
    getPermission(user?.token);
    getRole(user?.token, params.id).finally(() => setLoading(false));
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValues(role);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);
 
  let all = [];
  const map = (v) =>
    v?.map((item) => {
      if (item.leafList.length === 0) {
        all = [...all, item];
        return {
          father: item.code,
          childs: [],
        };
      }
      all = [...all, item];
      return {
        father: item.code,
        childs: map(item.leafList),
      };
    });

  map(permissions?.leafList);

  const handleErrors = (values) => {
    const requiredFields = formInputs.filter((item) => item.required)
    let err = {}
    requiredFields.map((v) => {
      if (v.id === 'email') {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          const val  = values[v.id]
          if (!regex.test(val)) {
            err = { ...err, [v.id]: t("roles.editRole.error.email", "- Incorrect format")}
            setErrors(err)
          }
      }
      const vals = typeof values[v.id] === 'number' ? values[v.id].toString() : values[v.id]
      if (isNil(values[v.id]) || isEmpty(vals)) {
        err = { ...err, [v.id]: t("roles.editRole.error.required", "Is required")}
        setErrors(err)
      }
      return err
    })
    return err
  }

  const handleForm = (val) => {
    const per = all
    .map((i) => ({
      code: i.code,
      description: i.description,
    }))
    .filter((v) => !isNil(val?.permissions[v.code]));
    setValues({
      ...val,
      permissions: per
    })
  }
  return (
    <>
      <Helmet title={t("roles.editRole.helmet", "Edit Role")} />
      <MasterLayout
        loading={false}
        render={({ user, menuItems, history }) => {
          const handleSubmit = () => {
            const va = isNil(values?.permissions) ? {} : values?.permissions
            const err = handleErrors(values)
            if (isEmpty(err)) {
            let selection = values?.permissions
            if (!Array.isArray(values?.permissions)) {
              selection = all
              .map((i) => ({
                code: i.code,
                description: i.description,
              }))
              .filter((v) => va[v.code]);
            }
            const payload = {
              name: values?.name || '',
              description: values?.description || '',
              permissions: selection
            }
            setSubmitting(true)
              editRole(user?.token, params?.id, payload)
                .then(() => {
                  setSubmitting(false)
                  history.push('/security/role/index')
                })
            }
            else {
              document.getElementById("master-content").scrollTo(0,0)
            }
          };
          return loading ? (
            <DataViewSkeleton />
          ) : (
            <Grid justify="space-between" container style={{ marginRight: 20 }}>
              <Grid item xs={12} style={{ marginBottom: 20 }}>
          <Typography variant="h5">{t("roles.editRole.title", "Edit Role")}{params.id}</Typography>
              </Grid>
              <Grid style={{ minHeight: "85%" }} item xs={12}>
                <Divider />
                <Grid xs={10} container style={{ marginBottom: 20 }}>
                <UserForm errors={errors} form={values} permissions={permissions} formInputs={formInputs} onChange={handleForm} />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
                <Grid
                  container
                  justify="flex-end"
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                >
                  <Button
                    variant="contained"
                    style={{ fontWeight: "bold", marginRight: 15 }}
                    onClick={() => history.replace("/security/role/index")}
                    color="default"
                  >
                    {t("roles.editRole.cancel", "Cancel")}
                  </Button>
                  <CButton
                    variant="contained"
                    loading={submitting}
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      background:
                        "linear-gradient(45deg, rgb(255, 96, 13) 30%, rgb(247, 170, 55) 90%)",
                    }}
                    onClick={handleSubmit}
                    color="default"
                  >
                    {t("roles.editRole.save", "Save Role")}
                  </CButton>
                </Grid>
              </Grid>
            </Grid>
          );
        }}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  account: state.account,
  permissions: state?.permissions?.data,
  role: state?.roles?.role,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getRole: getRoleById,
      editRole: putRole,
      getPermission: getPermissions,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRole);
