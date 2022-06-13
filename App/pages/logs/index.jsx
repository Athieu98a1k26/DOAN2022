import React from "react";
import Toolbar from "../../controls/toolbar";
import Card from "../../controls/card2";
import Loading from "../../controls/loading";
import { connect } from "../../lib/connect";
import * as actions from "../../actions/log";
import Select from "../../controls/select2";
import DatePicker from "../../controls/datetimepicker";
import moment from "moment";
import Col, { Row } from "../../controls/grid";
import Pagination from "../../controls/pagination";
class LogPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      items: this.props.logs.items || [],
      total: this.props.total || 0,
      filter: {
        logObject: null,
        logType: null,
        range: null,
        creator: null,
        page: 1,
        pageSize: 200,
      },
    };
  }

  componentDidMount() {
    if (!this.props.logs.loaded) {
      this.refresh();
    }
  }
  refresh = () => {
    this.setState({ loading: true });
    this.props.actions
      .getList(this.state.filter)
      .catch(({ error, message }) => {
        notify(message, "danger");
        this.setState({ loading: false });
      })
      .then((data) => {
        this.setState({ loading: false, items: data.list, total: data.total });
      })
      .catch((error) => {
        this.setState({ loading: false });
        alert(error.error, error.message, "danger");
      });
  };

  setFilter = (filter) => {
    this.setState(
      {
        filter: { ...this.state.filter, ...filter },
      },
      () => {
        this.setState({ loading: true });
        this.props.actions
          .filter(this.state.filter)
          .then((data) => {
            this.setState({
              loading: false,
              items: data.list,
              total: data.total,
              page: 1,
            });
          })
          .catch((error) => {
            this.setState({ loading: false });
            alert(error.error, error.message, "danger");
          });
      }
    );
  };
  render() {
    if (!this.props.logs.loaded) {
      return <Loading show />;
    }
    return (
      <div>
        <Row className="mb-3">
          <Col size="3">
            <DatePicker
              options={{ mode: "range" }}
              onChange={(range) => this.setFilter({ range })}
              value={this.state.filter.ranger}
              placeholder="Thời gian"
            />
          </Col>
          <Col size="3">
            <Select
              onChange={(logObject) => this.setFilter({ logObject })}
              value={this.state.filter.logObject}
              placeholder="Đối tượng"
              options={this.props.logObject}
            />
          </Col>
          <Col size="3">
            <Select
              onChange={(logType) => this.setFilter({ logType })}
              value={this.state.filter.logType}
              placeholder="Kiểu"
              options={this.props.logType}
            />
          </Col>
        </Row>
        <Card padding={0}>
          <table className="table">
            <thead>
              <tr>
                <th>Đối tượng</th>
                <th>Hành động</th>
                <th>Người thực hiện</th>
                <th>Thời gian</th>
                <th>Nội dung</th>
              </tr>
            </thead>
            <tbody>
              {this.state.items.map((item) => (
                <tr key={item.id}>
                  <td>{getEnumLabel(item.object, this.props.logObject)}</td>
                  <td>{getEnumLabel(item.action, this.props.logType)}</td>
                  <td>{item.userFullName || item.userName}</td>
                  <td>{moment(item.logTime).format("DD-MM-YYYY HH:mm")}</td>
                  <td>{item.content || item.objectId}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Loading show={this.state.loading} />
          {!this.state.loading && this.state.items.length == 0 && (
            <div className="list-empty-msg mb-2">Danh sách trống</div>
          )}
          <Pagination
            showFirstLast
            total={this.state.total}
            pageSize={this.state.filter.pageSize}
            page={this.state.filter.page}
            onChange={(page) => this.setFilter({ page })}
          />
        </Card>
      </div>
    );
  }
}

export default connect(
  LogPage,
  (state) => ({
    logs: state.log,
    logType: state.app.enums.logAction,
    logObject: state.app.enums.logObject,
  }),
  actions
);
