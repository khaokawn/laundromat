import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import './App.css';
import React, { useState, useEffect, useRef } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

function App() {
  const [paid, setPaid] = useState(false);
  const [paid2, setPaid2] = useState(false);
  const [WashingMachine1, setWashingMachine1] = useState(false);
  const [WashingMachine2, setWashingMachine2] = useState(false);

  const footerContent = (
    <div>
      <Button label="Cancel" onClick={() => setWashingMachine1(false)} className="p-button-text" />
      <Button label="Next" onClick={() => setWashingMachine1(false)} autoFocus disabled={paid === false} />
    </div>
  );

  const footerContent2 = (
    <div>
      <Button label="Cancel" onClick={() => setWashingMachine2(false)} className="p-button-text" />
      <Button label="Next" onClick={() => setWashingMachine2(false)} autoFocus disabled={paid2 === false} />
    </div>
  );

  const ColoredLine = () => (
    <hr
      style={{
        width: '30%',
        border: '2px solid #6495ED',
        borderRadius: '16px'
      }}
    />
  );

  useEffect(() => {
    document.title = 'Laundromat Company'
  })

  const toast = useRef(null);

  const showAlert = () => {
    toast.current.show({ 
      severity: 'warn', 
      summary: 'The washing machine will be finished in one minute.', 
      sticky: true
    });
  };

  const showSuccess = () => {
    toast.current.show({severity:'success', summary: 'Finish!', sticky: true});
  }

  const [timer, setTimer] = useState('');
  const [start, setStart] = useState(false);
  const firstStart = useRef(true);
  const tick = useRef();

  const [timer2, setTimer2] = useState('');
  const [start2, setStart2] = useState(false);
  const firstStart2 = useRef(true);
  const tick2 = useRef();

  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }
    if (start) {
      tick.current = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else {
      clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);
  }, [start]);

  const toggleStart = () => {
    setTimer(65)
    setPaid(true)
    setStart(true)
  };

  const dispSecondsAsMins = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const seconds_ = seconds % 60;
    if (mins <= 0 && seconds_ <= 0) {
      showSuccess()
      return setPaid(false)
    }
    if (mins && seconds_ === 0) {
      showAlert()
    }
    return mins.toString() + " : " + (seconds_ < 10 ? "0" + seconds_.toString() : seconds_.toString());
  };

  useEffect(() => {
    if (firstStart2.current) {
      firstStart2.current = !firstStart2.current;
      return;
    }
    if (start2) {
      tick2.current = setInterval(() => {
        setTimer2((timer2) => timer2 - 1);
      }, 1000);
    } else {
      clearInterval(tick2.current);
    }

    return () => clearInterval(tick2.current);
  }, [start2]);

  const toggleStart2 = () => {
    setTimer2(5)
    setPaid2(true)
    setStart2(true)
  };

  const dispSecondsAsMins2 = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const seconds_ = seconds % 60;
    if (mins <= 0 && seconds_ <= 0) {
      showSuccess()
      return setPaid2(false)
    }
    if (mins && seconds_ === 0) {
      showAlert()
    }
    return mins.toString() + " : " + (seconds_ < 10 ? "0" + seconds_.toString() : seconds_.toString());
  };

  return (
    <div style={{ backgroundColor: 'rgb(248, 249, 250)', padding: '10%', height: '100vh' }}>
      <div className="container" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px' }}>
        <div className="row justify-content-center">
          <div
            style={{
              fontWeight: '700',
              fontSize: '34px',
              lineHeight: '50px',
              letterSpacing: '0.02em',
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <span>Laundromat Company</span>
          </div>
          <div style={{ textAlign: '-webkit-center', paddingBottom: '50px'}}>
            <ColoredLine />
          </div>

          <Toast ref={toast} position="top-center" />
          <Dialog 
            header="Washing Machine 1"
            visible={WashingMachine1}
            className='dialog-box'
            onHide={() => setWashingMachine1(false)}
            footer={footerContent}
          >
            <div>
              <div style={{ textAlign: 'center', margin: '2%' }}>
                <img src="/qr.jpg" style={{ width: '40%' }} alt='' />
              </div>
              <div style={{ display: 'grid' }}><Button label="Paid 10$" onClick={toggleStart} /></div>
            </div>
          </Dialog>

          <Dialog 
            header="Washing Machine 2"
            visible={WashingMachine2}
            className='dialog-box'
            onHide={() => setWashingMachine2(false)}
            footer={footerContent2}
          >
            <div>
              <div style={{ textAlign: 'center', margin: '2%' }}>
                <img src="/qr.jpg" style={{ width: '40%' }} alt='' />
              </div>
              <div style={{ display: 'grid' }}><Button label="Paid 10$" onClick={toggleStart2} /></div>
            </div>
          </Dialog>

          {/* row 1 */}
          <div style={{ display: 'flex', gap: '100px', justifyContent: 'center', padding: '20px' }}>
            <div>
              <Button className="box-card" onClick={() => setWashingMachine1(true)} disabled={paid === true}>
                { paid === true ? 'Not available' : 'Available' }
              </Button>
              <div style={{ display: 'contents', textAlign: 'center', padding: '10px' }}>
                <div><span>Washing Machine 1</span></div>
                { paid === true &&
                  <div>
                    <span>{dispSecondsAsMins(timer)}</span>
                  </div>
                }
              </div>
            </div>
            <div>
              <Button className="box-card" onClick={() => setWashingMachine2(true)} disabled={paid2 === true}>
                { paid2 === true ? 'Not available' : 'Available' }
              </Button>
              <div style={{ display: 'contents', textAlign: 'center', padding: '10px' }}>
                <div><span>Washing Machine 2</span></div>
                { paid2 === true &&
                  <div>
                    <span>{dispSecondsAsMins2(timer2)}</span>
                  </div>
                }
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
