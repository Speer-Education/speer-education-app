import React, { Dialog } from '@mui/material'
import { Fragment, PropsWithChildren } from 'react'

/**
 * DialogBase
 * @component
 * @params {children} dialog children
 * @params {open} dialog open state
 * @params {onCLose} dialog close handler
 * 
 * @returns {React.ReactElement}
 */
export default function DialogBase({children, open, onClose}: PropsWithChildren<{
  open: boolean,
  onClose: () => void
}>) {

  return (
      <Dialog
        open={open}
        onClose={onClose}
      >
        {children}
      </Dialog>
  )
}
