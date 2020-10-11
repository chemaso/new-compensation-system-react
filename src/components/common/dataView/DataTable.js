import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";

function EnhancedTableHead(props) {
  const {
    classes,
    sortable,
    order,
    headCells,
    orderBy,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead style={{ background: "#e6e6e6" }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            style={{ fontWeight: "bold" }}
            align="left"
            padding="default"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon={!sortable}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: "100%",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function DataTable({
  initialOrderBy = "",
  sortable = false,
  initialOrder = "asc",
  headCells,
  loading,
  renderActions,
  onTableChange = () => {},
  rows,
  size = 0,
  page = 0,
  total = 0,
}) {
  const classes = useStyles();
  const [order, setOrder] = React.useState(initialOrder);
  const [orderBy, setOrderBy] = React.useState(initialOrderBy);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    onTableChange({ page: newPage })
  };

  const handleChangeRowsPerPage = (event) => {
    onTableChange({ page: 0, size: parseInt(event.target.value, 10) })
  };

  const rowsDefaultOptions = [5, 10, 25]
  const rowsOptions = rowsDefaultOptions.filter((item) => item <= total)

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              headCells={headCells}
              sortable={sortable}
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={sortable ? handleRequestSort : () => {}}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
                .map((row, index) => {
                  const cells = Object.entries(row)
                  return (
                    <TableRow
                      hover
                      key={row.id}
                      tabIndex={-1}
                    >
                      {cells.map(([name, cellValue]) => {
                          if (name === 'actions') {
                              return (
                                  <TableCell size='small'>
                                      {renderActions({  values: row, name })}
                                  </TableCell>
                              )
                          }
                          return (
                             <TableCell size='small' align="left">{cellValue}</TableCell>
                      )})}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowsOptions}
          component="div"
          count={total}
          rowsPerPage={size}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
