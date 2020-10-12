import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPermissions } from "../../../actions/permissions";
import { postRole } from "../../../actions/roles";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { setLogOut } from "../../../actions/account";
import MasterLayout from "../../../components/layout/MasterLayout";
import UserForm from "../../../components/common/Form";
import { DataViewSkeleton } from "../../../components/common/Skeletons";
import { Grid, Typography, Button, Divider } from "@material-ui/core";
import { useAccount } from "../../../hooks/user";

import Helmet from "../../../components/common/Helmet";
import CButton from "../../../components/common/ButtonWithLoading";

const formInputs = [
  {
    label: "Name",
    id: "name",
    maxLength: 100,
  },
  {
    label: "Description",
    id: "Description",
    maxLength: 100,
  },
  {
    label: "Permissions",
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
  const [values, setValues] = useState({});
  const params = useParams();
  const { decrypt } = useAccount();
  const user = decrypt(account?.user);
  useEffect(() => {
    setLoading(true)
    setPermissions(user?.token)
        .finally(()=> setLoading(false));
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

  return (
    <>
      <Helmet title="Add Role" />
      <MasterLayout
        loading={false}
        render={({ user, menuItems, history }) => {
          const handleSubmit = () => {
            let selection = all
            .map((i) => ({
              code: i.code,
              description: i.description,
            }))
            .filter((v) => values?.permissions[v.code]);
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
          };
          return loading ? (
            <DataViewSkeleton />
          ) : (
            <Grid justify="space-between" container style={{ marginRight: 20 }}>
              <Grid item xs={12} style={{ marginBottom: 20 }}>
                <Typography variant="h5">Add New Role:</Typography>
              </Grid>
              <Grid style={{ minHeight: "85%" }} item xs={12}>
                <Divider />
                <Grid xs={10} container style={{ marginBottom: 20 }}>
                  <UserForm permissions={permissions} formInputs={formInputs} onChange={handleForm} />
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
                    Cancel
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
                    Save Changes
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
