import React, {useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom'



export default function Portal({children}) {
  const targetEle = useRef(document.createElement('div'))
  useEffect(() => {
    const portalRoot = document.getElementById('portal-root')
    portalRoot.appendChild(targetEle.current)
    return () => {
      portalRoot.removeChild(targetEle.current);
    }
  },[targetEle.current])
  return createPortal(
    children,
    targetEle.current
  )
}
