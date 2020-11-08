import React, { useState } from "react";
import { connect } from "react-redux";
import { isNil, isEmpty } from 'lodash'
import { getDepartmentById, postDepartment } from "../../../actions/departments";
import { bindActionCreators } from "redux";
import { getPermissions } from "../../../actions/permissions";
import MasterLayout from "../../../components/layout/MasterLayout";
import UserForm from "../../../components/common/Form";
import { Grid, Typography, Button, Divider } from "@material-ui/core";
import CButton from "../../../components/common/ButtonWithLoading";
import { t } from '../../../i18n'
import Helmet from "../../../components/common/Helmet";

const formInputs = [
  {
    label:  t('departments.addDepartment.code',"Code"),
    id: "code",
    noSpaces: true,
    required: true,
    maxLength: 25,
  },
  {
    label:  t('departments.addDepartment.name',"Name"),
    id: "name",
    maxLength: 100,
    required: true,
  },
];

const AddDepartment = ({
  children,
  logOut,
  getDepartment,
  getPermission,
  createDepartment,
  permissions,
  department,
  account,
  ...rest
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});

  const handleForm = (v) => {
    setValues(v);
  };

  const handleErrors = (values) => {
    const requiredFields = formInputs.filter((item) => item.required)
    let err = {}
    requiredFields.map((v) => {
      if (v.id === 'email') {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          const val  = values[v.id]
          if (!regex.test(val)) {
            err = { ...err, [v.id]:  t('departments.addDepartment.error.email',"- Incorrect Format")}
            setErrors(err)
          }
      }
      const vals = typeof values[v.id] === 'number' ? values[v.id].toString() : values[v.id]
      if (isNil(values[v.id]) || isEmpty(vals)) {
        err = { ...err, [v.id]: t('departments.addDepartment.error.required',"Is Required")}
        setErrors(err)
      }
      return err
    })
    return err
  }

  return (
    <>
      <Helmet title={t("departments.addDepartment.helmet","Add Department")} />
      <MasterLayout
        loading={false}
        render={({ user, menuItems, history }) => {
          const handleSubmit = () => {
            const err = handleErrors(values)
            if (isEmpty(err)) {
              setSubmitting(true);
              createDepartment(user?.token, values).then(() => {
                setSubmitting(false);
                history.push("/maintanence/department/index");
              });
            }
            else {
              document.getElementById("master-content").scrollTo(0,0)
            }
          };
          return (
            <Grid justify="space-between" container style={{ marginRight: 20 }}>
              <Grid item xs={12} style={{ marginBottom: 20 }}>
                <Typography variant="h5">{t("departments.addDepartment.title","Add New Department")}</Typography>
              </Grid>
              <Grid style={{ minHeight: "85%" }} item xs={12}>
                <Divider />
                <Grid xs={10} container style={{ marginBottom: 20 }}>
                  <UserForm
                    errors={errors}
                    form={values}
                    permissions={permissions}
                    formInputs={formInputs}
                    onChange={handleForm}
                  />
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
                    onClick={() =>
                      history.replace("/maintanence/department/index")
                    }
                    color="default"
                  >
                    {t("departments.addDepartment.cancel","Cancel")}
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
                    {t("departments.addDepartment.save","Save Changes")}
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
  department: state?.departments?.department,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      createDepartment: postDepartment,
      getDepartment: getDepartmentById,
      getPermission: getPermissions,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDepartment);
