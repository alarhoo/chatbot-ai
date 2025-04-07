import React, { useState } from 'react'
import { Box, Typography, Link, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'

const FootnoteViewer = ({ footnotes }) => {
  const [showDialog, setShowDialog] = useState(false)

  const maxVisibleFootnotes = 3
  const hasMore = footnotes.length > maxVisibleFootnotes

  const handleOpenDialog = () => setShowDialog(true)
  const handleCloseDialog = () => setShowDialog(false)

  const visibleFootnotes = footnotes.slice(0, maxVisibleFootnotes)
  const remainingFootnotes = footnotes.slice(maxVisibleFootnotes)

  return (
    <Box mt={2}>
      <Typography variant='subtitle2' fontWeight='bold' gutterBottom>
        Source Documents:
      </Typography>

      {visibleFootnotes.map((footnote, index) => (
        <React.Fragment key={index}>
          <Link href={footnote} target='_blank' rel='noopener noreferrer' sx={{ display: 'inline' }}>
            {footnote.split('/').pop()}
          </Link>
          {index < visibleFootnotes.length - 1 && ', '}
        </React.Fragment>
      ))}

      {hasMore && (
        <>
          ,{' '}
          <Link
            component='button'
            onClick={handleOpenDialog}
            sx={{ display: 'inline', cursor: 'pointer', fontWeight: 500 }}
          >
            + {remainingFootnotes.length} more
          </Link>
          <Dialog open={showDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth>
            <DialogTitle>All Source Documents</DialogTitle>
            <DialogContent dividers>
              <Box display='flex' flexDirection='column' gap={1}>
                {footnotes.map((footnote, index) => (
                  <Link key={index} href={footnote} target='_blank' rel='noopener noreferrer'>
                    {footnote.split('/').pop()}
                  </Link>
                ))}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  )
}

export default FootnoteViewer
