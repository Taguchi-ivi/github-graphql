
// import React from 'react';

const MyList = () => {
    return (
        // react.fragment 余計なdivを増やさないようにする
        // <> だけでimportも不要になる
        // <React.Fragment> key属性のみつけられる,その際は<>では不可能
        <>
            <ul>
                <li>item-1</li>
                <li>item-2</li>
                <li>item-3</li>
            </ul>
        </>
        // </React.Fragment>
    )
}

const a = 0
export { MyList, a }

// 下記の場合、名前をつける必要がない。
// import時に別名の名前をつけることが可能
// export default MyList
