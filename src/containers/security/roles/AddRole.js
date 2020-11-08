import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { isEmpty, isNil } from 'lodash'
import { getPermissions } from "../../../actions/permissions";
import { postRole } from "../../../actions/roles";
import { bindActionCreators } from "redux";
import MasterLayout from "../../../components/layout/MasterLayout";
import UserForm from "../../../components/common/Form";
import { DataViewSkeleton } from "../../../components/common/Skeletons";
import { Grid, Typography, Button, Divider } from "@material-ui/core";
import { useAccount } from "../../../hooks/user";

import Helmet from "../../../components/common/Helmet";
import CButton from "../../../components/common/ButtonWithLoading";
import { t } from '../../../i18n'

const formInputs = [
  {
    label: t("roles.addRole.name", "Name"),
    id: "name",
    required: true,
    maxLength: 100,
  },
  {
    label: t("roles.addRole.description", "Description"),
    id: "description",
    required: true,
    maxLength: 100,
  },
  {
    label: t("roles.addRole.permissions", "Permissions"),
    id: "permissions",
    type: "treeview",
  },
];

const AddRole = ({
  children,
  logOut,
  setPermissions,
  createRole,
  permissions,
  account,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});
  const { decrypt } = useAccount();
  const user = decrypt(account?.user);
  useEffect(() => {
    setLoading(true)
    setPermissions(user?.token)
        .finally(()=> setLoading(false));
         // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleForm = (e, f) => {
    setValues({
      ...values,
      ...e
    })
  }

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
            err = { ...err, [v.id]: t("roles.addRole.error.email", "- Incorrect format")}
            setErrors(err)
          }
      }
      const vals = typeof values[v.id] === 'number' ? values[v.id].toString() : values[v.id]
      if (isNil(values[v.id]) || isEmpty(vals)) {
        err = { ...err, [v.id]:  t("roles.addRole.error.required", "Is required")}
        setErrors(err)
      }
      return err
    })
    return err
  }

  return (
    <>
      <Helmet title={t("roles.addRole.helmet", "Add Role")} />
      <MasterLayout
        loading={false}
        render={({ user, menuItems, history }) => {
          const va = isNil(values?.permissions) ? {} : values?.permissions
          const handleSubmit = () => {
            const err = handleErrors(values)
            if (isEmpty(err)) {
            let selection = all?.map((i) => ({
              code: i?.code,
              description: i?.description,
            })).filter((v) => va[v?.code]);
            const payload = {
              name: values?.name || '',
              description: values?.description || '',
              permissions: selection
            }
            setSubmitting(true)
            createRole(user?.token, payload)
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
                <Typography variant="h5">{t("roles.addRole.title", "Add Role")}</Typography>
              </Grid>
              <Grid style={{ minHeight: "85%" }} item xs={12}>
                <Divider />
                <Grid xs={10} container style={{ marginBottom: 20 }}>
                  <UserForm permissions={permissions} errors={errors} formInputs={formInputs} onChange={handleForm} />
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
                    {t("roles.addRole.cancel", "Cancel")}
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
                     {t("roles.addRole.save", "Save Role")}
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
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setPermissions: getPermissions,
      createRole: postRole,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRole);
