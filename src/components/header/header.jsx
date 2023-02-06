import React from 'react'

export default function Header() {
  return (
    // 
    <div className='headerShell d-flex'>
        <div className='userShell d-flex flex-wrap' >
            <ul style={{listStyle: 'none'}}>
                <li>avatar</li>
                <li>name</li>
                <li>open menu button</li>
            </ul>
        </div>
        <div className='controlShell' >
            <ul>
                <li>home</li>
                <li>catalog</li>
                <li>contact us</li>
            </ul>
        </div>
        <div className='logoShell' >
            logo
            <img alt=''/>
        </div>
    </div>
  )
}
