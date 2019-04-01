
import  React,{Component} from 'react';

// WrappedComponent 就是传入的包装组件
function withHoc(WrappedComponent) {
    return class extends Component {
        render () {
            return (
                <WrappedComponent />
            )
        }
    }
}
