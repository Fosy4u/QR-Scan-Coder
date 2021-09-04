import React, { useState, useRef, useEffect } from 'react';
import { Container, Card, CardContent, makeStyles, Grid, TextField, Button } from '@material-ui/core';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 10
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#3f51b5',
    color: '#fff',
    padding: 20


  },
  btn: {
    margin: 10,
    marginBottom: 20,
    textDecoration: 'none'
  }
}))



function App() {

  const classes = useStyles()
  const [text, setText] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [scanResultFile, setScanResultFile] = useState('')
  const [scanResultWebCam, setScanResultWebCam] = useState('')
  const qrRef = useRef(null)



  useEffect(() => { }, [scanResultFile])

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response)
    }
    catch (error) {
      console.log(error)
    }
  }
  const handleErrorFile = (error) => {
    console.log(error)
  }

  const fileScanHandle = (result) => {
    if (result) {
      setScanResultFile(result)
    }
  }

  const onScanFile = () => {
    qrRef.current.openImageDialog()
  }
  const handleErrorWebCam = (error) => {
    if (error) {
      console.log(error)
    }
  }
  const webCamScanHandle = (result) => {
    if (result) {
      setScanResultWebCam(result)
    }

  }

  return (
    <Container className={classes.container}>
      <Card>

        <h2 className={classes.title}>QR Scan Coder </h2>
        <CardContent>
          <Grid container spacing={2}>

            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <TextField label='Enter Text Here' onChange={(e) => { setText(e.target.value) }} />
              <Button className={classes.btn} variant='contained' color='primary' onClick={() => { generateQrCode() }} > Generate</Button>
              <br />
              <br />
              <br />
              {imageUrl ? (<div>
                <div>
                  <img src={imageUrl} alt='img' />
                </div>

                <div>
                  <Button className={classes.btn} variant='contained' ><a href={imageUrl} download='item'> Download</a>
                  </Button>
                </div>

              </div>) :
                null}


            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Button className={classes.btn} variant='contained' color='secondary' onClick={onScanFile}> Scan QR Code</Button>
              <QrReader
                ref={qrRef}
                delay={300}
                style={{ width: '100%' }}
                onError={handleErrorFile}
                onScan={fileScanHandle}
                legacyMode
              />
              <h3>Scanned Code : {scanResultFile}</h3>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <h3> QR Code Scan by Web Cam</h3>
              <QrReader

                delay={300}
                style={{ width: '100%' }}
                onError={handleErrorWebCam}
                onScan={webCamScanHandle}

              />
              <h3>Scan by Web Cam : {scanResultWebCam}</h3>
            </Grid>
          </Grid>

        </CardContent>
      </Card>
    </Container>

  );
}

export default App;
