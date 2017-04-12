import React from 'react';
import Upload from'antd/lib/upload';
import Modal from 'antd/lib/modal';
import Icon from 'antd/lib/icon';
import BugsStore from '../store/bugsStore';
const bugsStore = new BugsStore();
export default class UploadBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: bugsStore.bug.files || []
        };
        this.handlePreview = this.handlePreview.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.setFiles = this.setFiles.bind(this);
    }

    render() {
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">上传图片</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="/picture"
                    listType="picture-card"
                    fileList={this.state.fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {this.state.fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={this.state.previewImage}/>
                </Modal>
            </div>
        )
    }

    setFiles(files) {
        console.log(files);
        this.setState({
            fileList: files
        })
    }

    componentDidMount() {
        console.log('props', this.state.fileList)
    }

    handlePreview(file) {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        });
    }

    handleChange(fileList) {
        console.log('refer', fileList);
        this.setState({fileList: fileList.fileList});
    }

    handleCancel() {
        this.setState({previewVisible: false})
    }
}
