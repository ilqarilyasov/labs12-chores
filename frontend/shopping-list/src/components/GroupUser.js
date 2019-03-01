// collect user's total and net values
import React, { useReducer } from 'react';
import {getUserProfile, checkEmail, FETCHING_USER_PROFILE} from '../store/actions/rootActions';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './Styles/GroupUser.css';

class GroupUser extends React.Component{
    render(){
        
        let userTotal = 0;
        let userNet = 0;

        if(this.props.groupHistory){
            for(let i = 0; i < this.props.groupHistory.length; i++){
                if(this.props.groupHistory[i].groupID === Number(this.props.match.params.id)){
                    if(this.props.groupHistory[i].userID === Number(this.props.profile.id)){
                        userTotal += this.props.groupHistory[i].total
                    }
                }
            }
            userNet = this.props.groupTotal - userTotal;
            console.log(`net ${userNet}, total ${userTotal}, grouptotal: ${this.props.groupTotal}`)
        }
        return(
            <div className = 'group-user-container'>
                <div className = 'group-user-image'><img src = {this.props.profile.profilePicture} alt = 'group user image'></img></div>
                <h3>{this.props.profile.name}</h3>
                <div className = 'group-user-stats'>
                
                <div>Total: ${userTotal}</div>

                <div>Net: ${userNet}</div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    state = state.rootReducer; // pull values from state root reducer
    return {
        //state items
        needsNewItems: state.needsNewItems,
        groupHistory: state.groupHistory,
        currentUser: state.currentUser,
        groupUserProfiles: state.groupUserProfiles
    }
}

export default withRouter(connect(mapStateToProps, {
    // actions
    getUserProfile,
    checkEmail,
})(GroupUser));