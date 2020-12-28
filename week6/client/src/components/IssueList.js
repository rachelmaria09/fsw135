import React from 'react'
import Issue from './Issue'

export default function IssueList(props) {
    const {issues} = props
    console.log(issues)
    return(
        <div className="issue-list">
            {issues.map(issue => <Issue {...issue} key = {issue._id}/>)}
        </div>
    )
}