
import './lib/webaudio-controls.js';

const getBaseURL = () => {
  const base = new URL('.', import.meta.url);
  console.log("Base = " + base);
	return `${base}`;
};

const template = document.createElement("template");
template.innerHTML = `
  <style>
    H1 {
          color:red;
    }
    .controls-flex-container{
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 200px;
      height: 40px;
      background-color: #484848;
    }
    .stop{
        width: 16px;
        height: 16px;
        background: white;
        border: none;
        cursor: pointer;
    }
  </style>
  
  <audio id="myPlayer" crossorigin>
        <!-- <source src="http://mainline.i3s.unice.fr/mooc/horse.ogg" type="audio/ogg" /> -->
        <!-- <source src="http://mainline.i3s.unice.fr/mooc/horse.mp3" type="audio/mp3" /> -->
        <source src="http://mainline.i3s.unice.fr/mooc/guitarRiff1.mp3" type="audio/mp3">
        <!-- <source src="http://mainline.i3s.unice.fr/mooc/LaSueur.mp3" id="player" controls loop crossorigin="anonymous""> -->
        <!-- <source src="http://mainline.i3s.unice.fr/mooc/drums.mp3"> -->
  </audio>
  <div class ="controls-flex-container">
    <input type="image" id="playButton" class="custom_controls" alt="Login" width="16px" height="16px"
   src="./assets/imgs/button_play.png">
   <input type ="button" class="stop custom_controls" alt=""></input>
   <input type="image" id="pauseButton" class="custom_controls" alt="Login" width="16px" height="16px"
   src="./assets/imgs/button_pause.png">
   <input type="image" id="retourZero" class="custom_controls" alt="Login" width="16px" height="16px"
   src="./assets/imgs/button_replay.png">
   <input type="image" id ="setLoop" class="custom_controls" alt="Login" width="24px" height="24px"
   src="./assets/imgs/button_loop.png">
   <input type="image"  id ="currentPlus"  class="custom_controls" alt="Login" width="24px" height="24px"
   src="./assets/imgs/button_rewind.png">   
   </div>    
    <div id="setLoop2"></div>
    <!--<br>
    Volume: 0 <input type="range" min=0 max=1 step=0.1 oninput="player.volume=this.value"> 1-->
    <br>
    <label for="gainSlider">Master Volume</label>
    <!--<input type="range" min="0" max="1" step="0.01" value="1" id="gainSlider" /> -->
    <webaudio-knob id="gainSlider" src="./assets/imgs/LittlePhatty.png" diameter="32" sprites="100" value="1"
        min="0" max="1" step="0.01">
    </webaudio-knob>
    <div id="equalizer">
        <div class="controls">
            <label>60Hz</label>
           <!-- <input type="range" value="0" step="1" min="-30" max="30"  id="eq_0"></input>-->
            <webaudio-slider id="eq_0" width="250" height="20" value="0" 
            step="1" min="-30" max="30"  src="./assets/imgs/hsliderbody.png"
            knobsrc="./assets/imgs/hsliderknob.png">
            </webaudio-slider>
          <output id="gain0">0 dB</output>
          </div>
          <div class="controls">
            <label>170Hz</label>
            <webaudio-slider id="eq_1" width="250" height="20" value="0" 
            step="1" min="-30" max="30"  src="./assets/imgs/hsliderbody.png"
            knobsrc="./assets/imgs/hsliderknob.png">
            </webaudio-slider>
          <output id="gain1">0 dB</output>
          </div>
          <div class="controls">
            <label>350Hz</label>           
            <webaudio-slider id="eq_2" width="250" height="20" value="0" 
            step="1" min="-30" max="30"  src="./assets/imgs/hsliderbody.png"
            knobsrc="./assets/imgs/hsliderknob.png">
            </webaudio-slider>
        <output id="gain2">0 dB</output>
          </div>
          <div class="controls">
            <label>1000Hz</label>
            <webaudio-slider id="eq_3" width="250" height="20" value="0" 
            step="1" min="-30" max="30"  src="./assets/imgs/hsliderbody.png"
            knobsrc="./assets/imgs/hsliderknob.png">
            </webaudio-slider>
        <output id="gain3">0 dB</output>
          </div>
          <div class="controls">
            <label>3500Hz</label>
            <webaudio-slider id="eq_4" width="250" height="20" value="0" 
            step="1" min="-30" max="30"  src="./assets/imgs/hsliderbody.png"
            knobsrc="./assets/imgs/hsliderknob.png">
            </webaudio-slider>
        <output id="gain4">0 dB</output>
          </div>
          <div class="controls">
            <label>10000Hz</label>
            <webaudio-slider id="eq_5" width="250" height="20" value="0" 
            step="1" min="-30" max="30"  src="./assets/imgs/hsliderbody.png"
            knobsrc="./assets/imgs/hsliderknob.png">
            </webaudio-slider>
        <output id="gain5">0 dB</output>
          </div>
    </div>
    <div id="balance"> 
        <div class="controls">
           <label for="pannerSlider">Balance</label>
           <webaudio-knob  tooltip="Balance:%s" src="./assets/imgs/bouton2.png" sprites="127" value=0 min="-1" max="1" 
            step=0.1 id="pannerSlider">
           </webaudio-knob>
           
       
          </div>
   
   
   <!-- <input type="range" min="-1" max="1" step="0.1" value="0" id="pannerSlider" />-->
    
    </div>
    <div id="analyser">
        <canvas id="canvas-waveform" width="300" height="100"></canvas>
        <br>
        <!--<input type="checkbox" id="switch" name="switch" checked>-->
        <label for="switch"> Waveform / Frequence</label><br>
        <webaudio-switch id="switch"   src="./assets/imgs/switch_toggle.png" width="56" height="56" value="1">
        </webaudio-switch>
        
    </div>  
    <div id="vumeter">
        <div class="controls">
            <label for="vumeterknob">Volume Left</label>
            <webaudio-knob  id="vumeterknob" src="./assets/imgs/Vintage_VUMeter.png" sprites="50" value=0>
              </webaudio-knob>   
        </div>
        <div class="controls">
            <label for="vumeterknobRight">Volume Right</label>
            <webaudio-knob  id="vumeterknobRight" src="./assets/imgs/Vintage_VUMeter.png" sprites="50" value=0>
              </webaudio-knob>
        </div>    
    </div>      
        `;

class MyAudioPlayer extends HTMLElement {

  static get observedAttributes(){
    return ['volume', 'balance'];
  }
  constructor() {
    super();
    this.volume = 1;
    this.attachShadow({ mode: "open" });
    //this.shadowRoot.innerHTML = template;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.basePath = getBaseURL(); // url absolu du composant
    // Fix relative path in WebAudio Controls elements and images

    this.fixRelativeImagePaths();
    
    this.ctx = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new this.ctx();
    this.filters = [];
    //canvas initilisation
    this.canvas = this.shadowRoot.querySelector("#canvas-waveform");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.canvasContext = this.canvas.getContext('2d');

    this.vumeterknob = this.shadowRoot.querySelector("#vumeterknob");
    this.vumeterKnobRight = this.shadowRoot.querySelector("#vumeterknobRight");
    
   
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log("old value is: "+oldValue);
    console.log(this.getAttribute("volume"));
    
  }

  connectedCallback() {
    
    this.player = this.shadowRoot.querySelector("#myPlayer");
    this.player.loop = true;

    //equalizer
    this.equalizers = this.shadowRoot.querySelectorAll(".controls > webaudio-slider");

    //gain slider
    this.gainslider = this.shadowRoot.querySelector("#gainSlider");//gainSlider
    //panner slider
    this.pannerslider = this.shadowRoot.querySelector("#pannerSlider");
    //player initialization
    this.player.addEventListener('play', () => this.audioContext.resume());

    //swith visualisation
    this.swichAnalyser = this.shadowRoot.querySelector("#switch");
    
   
    
    this.buildAudioGraph();

    this.enableDisableLoop();

    this.declareListeners();
    this.initGradient();
  /*  requestAnimationFrame(() => {
      this.visualizeFrequency()
    });*/
    this.initializeDataForAnalyser(32, () => {
      this.visualizeFrequency();
    });
   
    
    
  }

  fixRelativeImagePaths() {

    let custom_controls = this.shadowRoot.querySelectorAll('.controls-flex-container > input[type=image]');
    custom_controls.forEach((e) => {
      let input_src = e.getAttribute('src');      
      if(input_src !== undefined){
        let src = e.getAttribute('src');
        e.src = this.basePath + "/" + src;
      }
    });
		// change webaudiocontrols relative paths for spritesheets to absolute
		let webaudioControls = this.shadowRoot.querySelectorAll(
			'webaudio-knob, webaudio-slider, webaudio-switch, img'
		);
		webaudioControls.forEach((e) => {
			let currentImagePath = e.getAttribute('src');
			if (currentImagePath !== undefined) {
				//console.log("Got wc src as " + e.getAttribute("src"));
				let imagePath = e.getAttribute('src');
        //e.setAttribute('src', this.basePath  + "/" + imagePath);
        e.src = this.basePath  + "/" + imagePath;
        //console.log("After fix : wc src as " + e.getAttribute("src"));
			}
    });

    //replace also the knobsrc relative path
    let webAdioSliders = this.shadowRoot.querySelectorAll('.controls > webaudio-slider');
    webAdioSliders.forEach((e) => {
      let knobsrcPath = e.getAttribute('knobsrc');
      if (knobsrcPath !== undefined) {
        
        let imagePathKnob = e.getAttribute('knobsrc');
       
        e.knobsrc = this.basePath  + "/" + imagePathKnob;
       
      }
    });
     
    
  }
  
  declareListeners() {
    this.shadowRoot.querySelector("#playButton").addEventListener("click", (event) => {
      this.play();
    });

    /*this.shadowRoot.querySelector("#knobVolume").addEventListener("input", (event) => {
        this.setVolume(event.target.value);
      });*/
      stop
    this.shadowRoot.querySelector(".stop").addEventListener("click", (event) =>{
        this.stop();
     });
    this.shadowRoot.querySelector("#pauseButton").addEventListener("click", (event) =>{
      this.pause();
    });
    this.shadowRoot.querySelector("#retourZero").addEventListener("click", (event) => {
      this.currentTime(0);
    });
    this.shadowRoot.querySelector("#currentPlus").addEventListener("click", (event) => {
      this.addToCurrentTime(3);//time in seconds
    });
    let arrBoolean = [false, true];
    this.shadowRoot.querySelector("#setLoop").addEventListener("click", (event) => {     
      this.player.loop = arrBoolean[event.target.value] ;
      this.enableDisableLoop();
     });
    this.gainslider.addEventListener("input", (event) => {
      this.gainNode.gain.value = event.target.value;
    });

    this.equalizers.forEach((e) => {
        e.addEventListener('input', (event) => {
          //console.log(event.target.value + " = " +event.target.id);
          this.changeGain(event.target.value,event.target.id);
          event.preventDefault();
        }, false)        
    });

    this.pannerslider.addEventListener('input', (event) =>{
      this.pannerNode.pan.value = event.target.value;
    });

    this.swichAnalyser.addEventListener('click', (event) =>{
        console.log(event.target.checked);
        if(event.target.value == 1){
          
          this.initializeDataForAnalyser(32, () => {
            this.visualizeFrequency();
          });
      }else {
          
          this.initializeDataForAnalyser(1024, () => {
            //this.visualizeWaveWithVolume();
            this.visualizeWaveForm();
          });
      }
    });
  
  }
  changeGain(sliderVal,idString) {
    var value = parseFloat(sliderVal);
    var nbFilter = parseInt(idString.split("_").pop());
    this.filters[nbFilter].gain.value = value;
    
    // update output labels
    var output = this.shadowRoot.querySelector("#gain"+nbFilter);
    output.value = value + " dB";
  }
  buildAudioGraph(){
    //source -> filters -> ... -> gain -> panner -> analyser -> destination
    let source = this.audioContext.createMediaElementSource(this.player);
    
    [60, 170, 350, 1000, 3500, 10000].forEach( (freq, i) => {
      let eq = this.audioContext.createBiquadFilter();
      eq.frequency.value = freq;
      eq.type = "peaking";
      eq.gain.value = 0;
      this.filters.push(eq);
    });
    source.connect(this.filters[0]);  
    for(var i = 0; i < this.filters.length - 1; i++) {
      this.filters[i].connect(this.filters[i+1]);
    }

    this.gainNode = this.audioContext.createGain();
    this.filters[this.filters.length - 1].connect(this.gainNode);

    //panner node
    this.pannerNode = this.audioContext.createStereoPanner();

    this.gainNode.connect(this.pannerNode);

    //analyser
    this.analyser = this.audioContext.createAnalyser();
    //this.initializeDataForAnalyser(32);
    //analyser for volume
    this.analyserLeft = this.audioContext.createAnalyser();
    this.analyserRight = this.audioContext.createAnalyser();

    this.pannerNode.connect(this.analyser);

    this.splitter = this.audioContext.createChannelSplitter();

    this.pannerNode.connect(this.splitter);
    this.splitter.connect(this.analyserLeft, 0, 0);
    this.splitter.connect(this.analyserRight, 1, 0);

    this.analyser.connect(this.audioContext.destination);
  }

  // API
  setVolume(val) {
    this.player.volume = val;
  }

  play() {
    this.player.play();
  }
  pause(){
    this.player.pause();
  }
  currentTime(value){
    this.player.currentTime = value;
  }
  addToCurrentTime(value){
    this.player.currentTime = this.player.currentTime - value;
  }
  stop(){
    this.player.load();
  }

  enableDisableLoop(){
    let setLoopButton =  this.shadowRoot.querySelector("#setLoop");
    let setLoopButton2 =  this.shadowRoot.querySelector("#setLoop2");
    if(this.player.loop === true){
     setLoopButton.value = 0
     setLoopButton2.textContent = "Loop Activé"
    }else {
      setLoopButton.value = 1
      setLoopButton2.textContent = "Loop Desactivé"
    } 

  }
  initGradient(){
    this.gradient = this.canvasContext.createLinearGradient(0,0,0, this.height);
    this.gradient.addColorStop(1,'#000000');
    this.gradient.addColorStop(0.75,'#ff0000');
    this.gradient.addColorStop(0.25,'#ffff00');
    this.gradient.addColorStop(0,'#ffffff');
  }
  initializeDataForAnalyser(fftValue, visualize){
    this.analyser.fftSize = fftValue;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    requestAnimationFrame( () => {
      visualize();
    });    
  }
  visualizeFrequency() {
    // clear the canvas
    this.canvasContext.clearRect(0, 0, this.width, this.height);
    
    // Or use rgba fill to give a slight blur effect
    //canvasContext.fillStyle = 'rgba(0, 0, 0, 0.5)';
    //canvasContext.fillRect(0, 0, width, height);
    
    // Get the analyser data
    this.analyser.getByteFrequencyData(this.dataArray);
  
     var barWidth = this.width / this.bufferLength;
        var barHeight;
        var x = 0;
     
        // values go from 0 to 256 and the canvas heigt is 100. Let's rescale
        // before drawing. This is the scale factor
        var heightScale = this.height/128;
    
        for(var i = 0; i < this.bufferLength; i++) {
          barHeight = this.dataArray[i];
  
  
          this.canvasContext.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
          barHeight *= heightScale;
          this.canvasContext.fillRect(x, this.height-barHeight/2, barWidth, barHeight/2);
  
          // 2 is the number of pixels between bars
          x += barWidth + 1;
        }

        this.drawSeparateVueMeter();
    

    // call again the visualize function at 60 frames/s
    requestAnimationFrame(() => {
      this.visualizeFrequency()
    });
    
  }
   visualizeWaveForm() {
    // clear the canvas 
    this.canvasContext.clearRect(0, 0, this.width, this.height);
    
    // We will draw it as a path of connected lines
    // First, clear the previous path that was in the buffer
    this.canvasContext.beginPath();
    
    // draw the data as a waveform
    // Get the data from the analyser
    this.analyser.getByteTimeDomainData(this.dataArray);
    // values are between 0 and 255
    
    // slice width
    var sliceWidth = this.width / this.bufferLength;
    
    var x = 0;
    for(var i = 0; i < this.bufferLength; i ++) {
      var v = this.dataArray[i]; // between 0 and 255
       v = v / 255; // now between 0 and 1
      
      var y = v * this.height;
      if(i === 0) {
        this.canvasContext.moveTo(x, y);
      } else {
        this.canvasContext.lineTo(x, y);
      } 
      
      x += sliceWidth;
    }
    
    // draw the whole waveform (a path)
    this.canvasContext.stroke();

    this.drawVolumeMeter();
    this.drawSeparateVueMeter();
    

   
    // call again the visualize function at 60 frames/s
    requestAnimationFrame(() => {
      this.visualizeWaveForm();
    });
  }
  getAverageVolume(array) {
    var values = 0;
    var average;

    var length = array.length;

    // get all the frequency amplitudes
    for (var i = 0; i < length; i++) {
        values += array[i];
    }

    average = values / length;
    return average;
  }
  drawVolumeMeter() {
    this.canvasContext.save();
    
    this.analyser.getByteFrequencyData(this.dataArray);
    var average = this.getAverageVolume(this.dataArray);
    
    // set the fill style to a nice gradient
    this.canvasContext.fillStyle=this.gradient;
   
    // draw the vertical meter
    this.canvasContext.fillRect(0,this.height-average,25,this.height);   
    
    this.canvasContext.restore();
}
drawSeparateVueMeter(){
    //left analyser
    this.analyserLeft.fftSize = 1024;
    this.bufferLengthLeft = this.analyserLeft.frequencyBinCount;
    this.dataArrayLeft = new Uint8Array(this.bufferLengthLeft);
    this.analyserLeft.getByteFrequencyData(this.dataArrayLeft);
    var averageLeft = this.getAverageVolume(this.dataArrayLeft);
    this.vumeterknob.value = (this.height+averageLeft) % this.height;
    this.vumeterknob.max = this.height;

    //right analyser
    this.analyserRight.fftSize = 1024;
    this.bufferLengthRight = this.analyserRight.frequencyBinCount;
    this.dataArrayRight = new Uint8Array(this.bufferLengthRight);
    this.analyserRight.getByteFrequencyData(this.dataArrayRight);
    var averageRight = this.getAverageVolume(this.dataArrayRight);
    this.vumeterKnobRight.value = (this.height+averageRight) % this.height;
    this.vumeterKnobRight.max = this.height;
}
}

customElements.define("my-audioplayer", MyAudioPlayer);
