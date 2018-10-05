import React from 'react';
import { Modal, Button } from 'antd';

class FormDialog extends React.Component {
  state = {
    ModalVisible: false,
  };

  handleCancel = () => {
    this.setState({
      ModalVisible: false,
    });
  };

  open = () => this.setState({ ModalVisible: true });

  render() {
    const { ModalContent, title } = this.props;
    const { ModalVisible } = this.state;

    return (
      <div>
        <Modal
          bodyStyle={{ overflow: 'auto' }}
          footer={<Button onClick={this.handleCancel}>cancel</Button>}
          title={title}
          visible={ModalVisible}
          onCancel={this.handleCancel}
        >
          {ModalContent}
        </Modal>
      </div>
    );
  }
}
export default FormDialog;
