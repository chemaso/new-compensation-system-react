import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { isEmpty, isNil } from "lodash";
import { getDepartmentById, putDepartment } from "../../../actions/departments";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getPermissions } from "../../../actions/permissions";
import MasterLayout from "../../../components/layout/MasterLayout";
import UserForm from "../../../components/common/Form";
import { DataViewSkeleton } from "../../../components/common/Skeletons";
import { Grid, Typography, Button, Divider } from "@material-ui/core";
import CButton from "../../../components/common/ButtonWithLoading";
import { useAccount } from "../../../hooks/user";
import { t } from "../../../i18n";
import Helmet from "../../../components/common/Helmet";

const formInputs = [
  {
    label: t("departments.editDepartment.id", "ID"),
    id: "id",
    disabled: true,
    maxLength: 100,
  },
  {
    label: t("departments.editDepartment.code", "Code"),
    id: "code",
    noSpaces: true,
    required: true,
    maxLength: 25,
  },
  {
    label: t("departments.editDepartment.name", "Name"),
    id: "name",
    maxLength: 100,
    required: true,
  },
];

const EditDepartment = ({
  children,
  logOut,
  getDepartment,
  getPermission,
  editDepartment,
  permissions,
  department,
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
    getDepartment(user?.token, params.id).finally(() => setLoading(false));
             // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValues(department);
             // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [department]);

  const handleForm = (v) => {
    setValues(v);
  };

  const handleErrors = (values) => {
    const requiredFields = formInputs.filter((item) => item.required);
    let err = {};
    requiredFields.map((v) => {
      if (v.id === "email") {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const val = values[v.id];
        if (!regex.test(val)) {
          err = {
            ...err,
            [v.id]: t(
              "departments.editDepartment.error.email",
              "- Incorrect Format"
            ),
          };
          setErrors(err);
        }
      }
      const vals =
        typeof values[v.id] === "number"
          ? values[v.id].toString()
          : values[v.id];
      if (isNil(values[v.id]) || isEmpty(vals)) {
        err = {
          ...err,
          [v.id]: t("departments.editDepartment.error.required", "Is Required"),
        };
        setErrors(err);
      }
      return err
    });
    return err;
  };

  return (
    <>
      <Helmet
        title={t("departments.editDepartment.helmet", "Edit Department")}
      />
      <MasterLayout
        loading={false}
        render={({ user, menuItems, history }) => {
          const handleSubmit = () => {
            const err = handleErrors(values);
            if (isEmpty(err)) {
              setSubmitting(true);
              editDepartment(user?.token, params?.id, values).then(() => {
                setSubmitting(false);
                history.push("/maintanence/department/index");
              });
            } else {
              document.getElementById("master-content").scrollTo(0, 0);
            }
          };
          return loading ? (
            <DataViewSkeleton />
          ) : (
            <Grid justify="space-between" container style={{ marginRight: 20 }}>
              <Grid item xs={12} style={{ marginBottom: 20 }}>
                <Typography variant="h5">
                  {t("departments.editDepartment.title", "Edit Department #:")}
                  {params.id}
                </Typography>
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
                      {t("departments.editDepartment.cancel","Cancel")}
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
                     {t("departments.editDepartment.save","Save Changes")}
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
      editDepartment: putDepartment,
      getDepartment: getDepartmentById,
      getPermission: getPermissions,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDepartment);
