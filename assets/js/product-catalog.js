(function(){
  const P='assets/optimized/refresh/products/';
  const pending='assets/product-view-pending.svg';
  const imageMap=(model,colors)=>Object.fromEntries(colors.map(([label,file])=>[label,`${P}${model}${file}.webp`]));
  const fiveImages=(images)=>{
    const gallery=[...new Set(images.filter(Boolean))].slice(0,5);
    while(gallery.length<5)gallery.push(pending);
    return gallery;
  };
  const point=(title,text,media)=>({title,text,media});
  const shared={
    flushing:point('Confident Flushing','A tuned water path delivers a complete rinse and dependable discharge for consistent everyday use.','assets/optimized/technology-flushing-desktop.webp'),
    washing:point('Personalized Washing','Adjustable water temperature, pressure and spray position support comfortable daily care.','assets/optimized/technology-washing-desktop.webp'),
    seat:point('Four-season Seat Comfort','Adjustable seat temperature keeps the surface comfortably warm through changing seasons.','assets/optimized/technology-seat-desktop.webp'),
    nozzle:point('Hygienic Nozzle Care','Self-cleaning and antimicrobial nozzle care supports a cleaner wash path before and after use.','assets/feature-ag-nozzle.jpg')
  };
  const toiletPoints=(first)=>[first,shared.flushing,shared.washing,shared.seat];
  const bidetPoints=(first)=>[first,shared.washing,shared.nozzle,shared.seat];
  const spec=(label,value)=>({label,value});
  const toiletSpecs=({model,colors,size,trap='With P-trap',configuration='Manual / Auto',outlet='S-trap / P-trap',rough='250 / 300 / 400 mm',waste='180 mm',flush='Siphonic tornado flush'})=>[
    spec('Model',model),spec('Product type','One-piece smart toilet'),spec('Available colors',colors.join(' / ')),spec('Dimensions',size),spec('Ceramic P-trap',trap),spec('Configuration',configuration),spec('Outlet type',outlet),spec(outlet.includes('P-trap')?'S-trap rough-in distance':'Rough-in distance',rough),...(waste?[spec('Wall outlet height',waste)]:[]),spec('Flush method',flush),spec('Seat temperature','OFF / 35°C / 37°C / 39°C'),spec('Air temperature','OFF / 45°C / 50°C / 55°C'),spec('Water temperature','OFF / 35°C / 37°C / 40°C')
  ];
  const wallSpecs=({model,colors,size})=>[
    spec('Model',model),spec('Product type','Wall-hung smart toilet'),spec('Available colors',colors.join(' / ')),spec('Dimensions',size),spec('Ceramic P-trap','Without P-trap'),spec('Configuration','Manual / Auto'),spec('Outlet type','P-trap with rough-in bracket'),spec('Anchor bolt spacing','180 mm'),spec('Flush method','Washdown flush'),spec('Seat temperature','OFF / 35°C / 37°C / 39°C'),spec('Air temperature','OFF / 45°C / 50°C / 55°C'),spec('Water temperature','OFF / 35°C / 37°C / 40°C')
  ];
  const variantRow=(category,feature,standard,premium)=>({category,feature,standard,premium});
  const toiletOtherFeatures=[
    variantRow('Cover & Seat','Manual cover opening',true,false),variantRow('Cover & Seat','Radar sensor',false,true),variantRow('Cover & Seat','Manual seat opening',true,false),variantRow('Cover & Seat','Automatic cover opening',false,true),variantRow('Cover & Seat','Foot-sensor cover / seat opening',false,true),variantRow('Cover & Seat','Flush after lid closure',false,true),
    variantRow('Washing','Rear washing',true,true),variantRow('Washing','Front washing',true,true),variantRow('Washing','Oscillating washing',true,true),variantRow('Washing','Children’s washing',true,true),variantRow('Washing','Adjustable water pressure',true,true),variantRow('Washing','Adjustable water temperature',true,true),variantRow('Washing','Adjustable washing position',true,true),
    variantRow('Flushing','Power-outage flushing',true,true),variantRow('Flushing','Flush after leaving the seat',true,true),variantRow('Flushing','Foot-sensor flushing',true,true),
    variantRow('User-friendly','Soft-close cover and seat',true,true),variantRow('User-friendly','No water-pressure limit',true,true),variantRow('User-friendly','Warm-air drying',true,true),variantRow('User-friendly','Heated seat',true,true),variantRow('User-friendly','Nozzle self-cleaning',true,true),variantRow('User-friendly','Antimicrobial nozzle',true,true),variantRow('User-friendly','LED night light',true,true),variantRow('User-friendly','High-definition display',true,true),
    variantRow('Adjustment','Adjustable air temperature',true,true),variantRow('Adjustment','Adjustable seat temperature',true,true),variantRow('Control','Wireless remote control',true,true),
    variantRow('Energy','Instant water heating',true,true),variantRow('Energy','Power-saving mode',true,true),variantRow('Protection','Leakage protection',true,true),variantRow('Protection','Flame-retardant seat',true,true),variantRow('Protection','Safe voltage',true,true),variantRow('Protection','Power-off memory',true,true),variantRow('Protection','IPX4 waterproofing',true,true)
  ];
  const bidetOtherFeatures=(control)=>[
    variantRow('Cover & Seat','Manual cover opening',true,false),variantRow('Cover & Seat','Radar sensor',false,true),variantRow('Cover & Seat','Manual seat opening',true,false),variantRow('Cover & Seat','Automatic cover opening',false,true),
    variantRow('Washing','Inlet-water filtration',true,true),variantRow('Washing','Rear washing',true,true),variantRow('Washing','Front washing',true,true),variantRow('Washing','Oscillating washing',true,true),variantRow('Washing','Children’s washing',true,true),variantRow('Washing','Adjustable water pressure',true,true),variantRow('Washing','Adjustable water temperature',true,true),variantRow('Washing','Adjustable washing position',true,true),
    variantRow('User-friendly','Soft-close cover and seat',true,true),variantRow('User-friendly','Warm-air drying',true,true),variantRow('User-friendly','Heated seat',true,true),variantRow('User-friendly','Nozzle self-cleaning',true,true),variantRow('User-friendly','Antimicrobial nozzle',true,true),variantRow('User-friendly','LED night light',true,true),variantRow('User-friendly','High-definition display',true,true),
    variantRow('Adjustment','Adjustable air temperature',true,true),variantRow('Adjustment','Adjustable seat temperature',true,true),variantRow('Control',control,true,true),variantRow('Energy','Instant water heating',true,true),variantRow('Energy','Power-saving mode',true,true),variantRow('Protection','Leakage protection',true,true),variantRow('Protection','Flame-retardant seat',true,true),variantRow('Protection','Safe voltage',true,true),variantRow('Protection','Power-off memory',true,true),variantRow('Protection','IPX4 waterproofing',true,true)
  ];
  const makeProduct=(data)=>{
    data.gallery=fiveImages(data.gallery||Object.values(data.colorImages||{}));
    data.imagePending=false;
    return data;
  };
  const products={};
  const add=(data)=>{products[data.model]=makeProduct(data)};
  const addToilet=(data)=>add({...data,category:'one-piece',specifications:toiletSpecs(data),otherFeatures:toiletOtherFeatures,sellingPoints:toiletPoints(data.firstPoint),first:data.firstPoint.title});

  let colorImages=imageMap('605',[['White','-white']]);
  addToilet({model:'605',name:'605 One-piece Smart Toilet',series:'H / U White Series',group:'onePieceHU',image:colorImages.White,colorImages,colors:Object.keys(colorImages),size:'405 × 680 × 452 mm',mainFeatures:['UV sterilization','Removable nozzle','Smart flush-volume recognition','48-hour water-tank anti-scale care','Four-season seat temperature','Defecation-assist washing','Female-care washing'],firstPoint:point('UV Hygiene','Integrated UV sterilization supports hygienic care for the washing system.','assets/technology-01-final.jpg')});
  colorImages=imageMap('608',[['White','-white']]);
  addToilet({model:'608',name:'608 One-piece Smart Toilet',series:'H / U White Series',group:'onePieceHU',image:colorImages.White,colorImages,colors:Object.keys(colorImages),size:'405 × 680 × 510 mm',mainFeatures:['UV sterilization','Removable nozzle','Smart flush-volume recognition','48-hour water-tank anti-scale care','Four-season seat temperature','Defecation-assist washing','Female-care washing'],firstPoint:point('Removable Nozzle','A removable nozzle simplifies routine inspection, cleaning and maintenance.','assets/feature-ag-nozzle.jpg')});
  colorImages=imageMap('806',[['White','-white'],['Black','-black'],['Grey','-grey']]);
  addToilet({model:'806',name:'806 One-piece Smart Toilet',series:'H / U White Series',group:'onePieceHU',image:colorImages.White,colorImages,colors:['White','Black'],size:'400 × 700 × 470 mm',mainFeatures:['UV sterilization','Integrated fragrance','Removable nozzle','Waterway descaling','Dual remote control','Smart flush-volume recognition','48-hour water-tank anti-scale care','Four-season seat temperature','Defecation-assist washing','Female-care washing'],firstPoint:point('Waterway Descaling','A dedicated maintenance cycle helps reduce scale inside the internal water path.','assets/optimized/technology-descaling-desktop.webp')});
  colorImages=imageMap('809',[['White','-white'],['Grey','-grey']]);
  addToilet({model:'809',name:'809 One-piece Smart Toilet',series:'H / U White Series',group:'onePieceHU',image:colorImages.White,colorImages,colors:Object.keys(colorImages),size:'400 × 700 × 460 mm',mainFeatures:['UV sterilization','Integrated fragrance','Removable nozzle','Oscillating dryer','Built-in water filtration','Dual remote control','Smart flush-volume recognition','48-hour water-tank anti-scale care','Four-season seat temperature','Defecation-assist washing','Female-care washing'],firstPoint:point('Built-in Water Filtration','Integrated filtration supports a cleaner and more stable washing supply.','assets/feature-ag-nozzle.jpg')});
  colorImages=imageMap('810a',[['White','-white'],['Grey','-grey'],['Silver','-silver']]);
  addToilet({model:'810A',name:'810A One-piece Smart Toilet',series:'H / U White Series',group:'onePieceHU',image:colorImages.White,colorImages,colors:Object.keys(colorImages),size:'400 × 700 × 460 mm',mainFeatures:['UV sterilization','Integrated fragrance','Removable nozzle','Oscillating dryer','Built-in water filtration','Dual remote control','Smart flush-volume recognition','48-hour water-tank anti-scale care','Four-season seat temperature','Defecation-assist washing','Female-care washing'],firstPoint:point('Built-in Water Filtration','Integrated filtration supports a cleaner and more stable washing supply.','assets/feature-ag-nozzle.jpg')});
  colorImages=imageMap('810b',[['White','-white']]);
  addToilet({model:'810B',name:'810B One-piece Smart Toilet',series:'H / U White Series',group:'onePieceHU',image:colorImages.White,colorImages,colors:Object.keys(colorImages),size:'400 × 700 × 460 mm',mainFeatures:['UV sterilization','Integrated fragrance','Removable nozzle','Oscillating dryer','Built-in water filtration','Dual remote control','Smart flush-volume recognition','48-hour water-tank anti-scale care','Four-season seat temperature','Defecation-assist washing','Female-care washing'],firstPoint:point('Removable Nozzle','A removable nozzle supports convenient access and routine care.','assets/feature-ag-nozzle.jpg')});
  colorImages=imageMap('811',[['White','-white'],['Grey','-grey']]);
  addToilet({model:'811',name:'811 One-piece Smart Toilet',series:'H / U White Series',group:'onePieceHU',image:colorImages.White,colorImages,colors:Object.keys(colorImages),size:'400 × 700 × 460 mm',outlet:'Only for S-trap',waste:'',mainFeatures:['UV sterilization','Integrated fragrance','Removable nozzle','Oscillating dryer','Built-in water filtration','Dual remote control','Smart flush-volume recognition','48-hour water-tank anti-scale care','Four-season seat temperature','Defecation-assist washing','Female-care washing','Silent flush system'],firstPoint:point('Silent Flush System','A tuned flush path reduces operating noise while maintaining reliable performance.','assets/optimized/technology-flushing-desktop.webp')});
  colorImages=imageMap('801p',[['White','-white'],['Black','-black'],['Orange','-orange'],['Yellow','-yellow'],['Blue','-blue'],['Pink','-pink'],['Beige Camel','-beige'],['Grey','-grey']]);
  addToilet({model:'801P',name:'801P Colorful One-piece Smart Toilet',series:'O Color Series',group:'onePieceO',image:colorImages.Orange,colorImages,colors:Object.keys(colorImages),size:'480 × 715 × 540 mm',outlet:'Only for S-trap',waste:'',mainFeatures:['UV sterilization','Dual remote control','Smart flush-volume recognition','48-hour water-tank anti-scale care','Four-season seat temperature','Defecation-assist washing','Female-care washing'],firstPoint:point('Dual Remote Control','Two convenient control options keep everyday functions within easy reach.','assets/technology-01-final.jpg')});
  colorImages=imageMap('805',[['White','-white'],['Black','-black'],['Orange','-orange'],['Yellow','-yellow'],['Blue','-blue'],['Pink','-pink'],['Beige Camel','-beige']]);
  addToilet({model:'805',name:'805 Colorful One-piece Smart Toilet',series:'O Color Series',group:'onePieceO',image:colorImages.Blue,colorImages,colors:Object.keys(colorImages),size:'430 × 690 × 465 mm',outlet:'Only for S-trap',waste:'',mainFeatures:['UV sterilization','Integrated fragrance','Removable nozzle','Oscillating dryer','Waterway descaling','Dual remote control','Smart flush-volume recognition','48-hour water-tank anti-scale care','Four-season seat temperature','Defecation-assist washing','Female-care washing'],firstPoint:point('Integrated Fragrance','A built-in fragrance function helps keep the bathroom feeling fresh after use.','assets/optimized/products/805-orange.webp')});

  colorImages=imageMap('888b',[['White','-white'],['Black','-black']]);
  add({model:'888B',name:'888B Wall-hung Smart Toilet',series:'Wall-hung Collection',group:'wallHung',category:'wall-hung',image:colorImages.White,colorImages,colors:['White','Black','Silver'],size:'580 × 395 × 380 mm',installation:'P-trap with rough-in bracket',configuration:'Manual / Auto',specifications:wallSpecs({model:'888B',colors:['White','Black','Silver'],size:'580 × 395 × 380 mm'}),mainFeatures:['UV sterilization','Removable nozzle','Integrated child seat','48-hour water-tank anti-scale care','Smart flush-volume recognition','Four-season seat temperature','Defecation-assist washing','Female-care washing'],otherFeatures:toiletOtherFeatures,firstPoint:point('Integrated Child Seat','A child-friendly seat option supports more comfortable shared-family use.','assets/optimized/products/888b-white.webp'),sellingPoints:toiletPoints(point('Integrated Child Seat','A child-friendly seat option supports more comfortable shared-family use.','assets/optimized/products/888b-white.webp')),first:'Integrated Child Seat'});
  colorImages=imageMap('611B',[['White','']]);colorImages.Grey=`${P}611B.webp`;
  add({model:'611B',name:'611B Wall-hung Smart Toilet',series:'Wall-hung Collection',group:'wallHung',category:'wall-hung',image:`${P}611B.webp`,colorImages,colors:['White','Grey'],size:'580 × 395 × 375 mm',installation:'P-trap with rough-in bracket',configuration:'Manual / Auto',specifications:wallSpecs({model:'611B',colors:['White','Grey'],size:'580 × 395 × 375 mm'}),mainFeatures:['UV sterilization','Removable nozzle','Integrated child seat','Waterway descaling','48-hour water-tank anti-scale care','Smart flush-volume recognition','Four-season seat temperature','Defecation-assist washing','Female-care washing'],otherFeatures:toiletOtherFeatures,firstPoint:point('Waterway Descaling','A dedicated maintenance cycle helps reduce scale inside the internal water path.','assets/optimized/technology-descaling-desktop.webp'),sellingPoints:toiletPoints(point('Waterway Descaling','A dedicated maintenance cycle helps reduce scale inside the internal water path.','assets/optimized/technology-descaling-desktop.webp')),first:'Waterway Descaling'});

  const bidetSpecs=(models,colors,dimensions)=>[spec('Models',models),spec('Product type','Intelligent bidet seat'),spec('Available colors',colors.join(' / ')),...dimensions.map(([model,size])=>spec(`${model} dimensions`,size)),spec('Configuration','Manual / Auto'),spec('Seat temperature','OFF / 35°C / 37°C / 39°C'),spec('Air temperature','OFF / 45°C / 50°C / 55°C'),spec('Water temperature','OFF / 35°C / 37°C / 40°C')];
  colorImages={'White':`${P}f01-white.webp`,'Black':`${P}f01-black.webp`};
  add({model:'F01-F02',name:'F01 / F02 Handle-control Bidet Seat',series:'Handle-control Bidet Seats',group:'bidetsHandle',category:'bidet-seats',image:`${P}f01-white.webp`,colorImages,colors:['White','Black'],size:'F01: 450 × 515 × 115 mm · F02: 450 × 495 × 115 mm',installation:'Top-mounted seat',configuration:'Manual / Auto',gallery:[`${P}f01-white.webp`,`${P}f01-black.webp`,`${P}f02-white.webp`,`${P}f02-black.webp`],variants:[{model:'F01',shape:'V-shaped handle',size:'450 × 515 × 115 mm'},{model:'F02',shape:'U-shaped handle',size:'450 × 495 × 115 mm'}],specifications:bidetSpecs('F01 / F02',['White','Black'],[['F01','450 × 515 × 115 mm'],['F02','450 × 495 × 115 mm']]),mainFeatures:['UV sterilization','Four-season seat temperature','Defecation-assist washing','Female-care washing'],otherFeatures:bidetOtherFeatures('Portable control handle'),sellingPoints:bidetPoints(point('Portable Control Handle','A dedicated handle keeps daily washing and temperature controls easy to reach.','assets/optimized/products/f01-white.webp')),first:'Portable Control Handle'});
  colorImages={'White':`${P}f01s-white.webp`,'Black':`${P}f01s-black.webp`};
  add({model:'F01S-F02S',name:'F01S / F02S Button & Remote Bidet Seat',series:'Button & Remote Bidet Seats',group:'bidetsButton',category:'bidet-seats',image:`${P}f01s-white.webp`,colorImages,colors:['White','Black'],size:'F01S: 390 × 515 × 115 mm · F02S: 390 × 495 × 115 mm',installation:'Top-mounted seat',configuration:'Manual / Auto',gallery:[`${P}f01s-white.webp`,`${P}f01s-black.webp`,`${P}f02s-white.webp`,`${P}f02s-black.webp`],variants:[{model:'F01S',shape:'V-shaped button panel',size:'390 × 515 × 115 mm'},{model:'F02S',shape:'U-shaped button panel',size:'390 × 495 × 115 mm'}],specifications:bidetSpecs('F01S / F02S',['White','Black'],[['F01S','390 × 515 × 115 mm'],['F02S','390 × 495 × 115 mm']]),mainFeatures:['UV sterilization','Four-season seat temperature','Defecation-assist washing','Female-care washing'],otherFeatures:bidetOtherFeatures('Wireless remote control and portable keys'),sellingPoints:bidetPoints(point('Button & Remote Control','Wireless remote control and direct portable keys offer flexible daily operation.','assets/optimized/products/f01s-white.webp')),first:'Button & Remote Control'});

  const refreshedGallery=(...files)=>fiveImages(files.map((file)=>`${P}${file}`));
  products['608'].gallery=refreshedGallery('608-gallery-5.webp','608-white.webp');
  products['806'].gallery=refreshedGallery('806-gallery-5.webp','806-white.webp','806-black.webp','806-grey.webp');
  products['809'].gallery=refreshedGallery('809-gallery-2.webp','809-white.webp','809-grey.webp');
  products['810A'].gallery=refreshedGallery('810a-gallery-5.webp','810a-white.webp','810a-grey.webp','810a-silver.webp');
  products['810B'].gallery=refreshedGallery('810b-gallery-5.webp','810b-white.webp');
  products['801P'].gallery=refreshedGallery('801p-gallery-1.webp','801p-gallery-2.webp','801p-gallery-3.webp','801p-gallery-4.webp','801p-gallery-5.webp');
  products['805'].gallery=refreshedGallery('805-gallery-1.webp','805-gallery-2.webp','805-gallery-3.webp','805-gallery-4.webp','805-gallery-5.webp');
  products['888B'].gallery=refreshedGallery('888b-gallery-5.webp','888b-white.webp','888b-black.webp');
  products['611B'].image=`${P}611B-white.webp`;
  products['611B'].colorImages={White:`${P}611B-white.webp`,Grey:`${P}611B-white.webp`};
  products['611B'].gallery=refreshedGallery('611B-white.webp');
  products['806'].sellingPoints[0].media='assets/optimized/technology-descaling-desktop.webp';
  products['811'].sellingPoints[0].media='assets/optimized/technology-flushing-desktop.webp';
  products['611B'].sellingPoints[0].media='assets/optimized/technology-descaling-desktop.webp';
  products['805'].sellingPoints[0].media=`${P}805-orange.webp`;
  products['888B'].sellingPoints[0].media=`${P}888b-white.webp`;
  products['F01-F02'].sellingPoints[0].media=`${P}f01-white.webp`;
  products['F01S-F02S'].sellingPoints[0].media=`${P}f01s-white.webp`;

  window.DAWN_CATALOG={
    categories:{
      'one-piece':{slug:'one-piece',title:'One-piece Smart Toilets',eyebrow:'Integrated Bathroom Collection',description:'Sculptural ceramic forms combine intelligent washing, dependable flushing and season-ready comfort.',poster:'assets/optimized/refresh/category-hero-one-piece-desktop.webp',posterMobile:'assets/optimized/refresh/category-hero-one-piece-mobile.webp',groups:['onePieceHU','onePieceO']},
      'wall-hung':{slug:'wall-hung',title:'Wall-hung Smart Toilets',eyebrow:'Space-saving Collection',description:'Concealed installation keeps the floor clear and gives compact bathrooms a lighter architectural profile.',poster:'assets/optimized/refresh/category-hero-wall-hung-desktop.webp',posterMobile:'assets/optimized/refresh/category-hero-wall-hung-mobile.webp',groups:['wallHung']},
      'bidet-seats':{slug:'bidet-seats',title:'Intelligent Bidet Seats',eyebrow:'Comfort Upgrade Collection',description:'Add adjustable washing and heated-seat comfort to compatible ceramic toilets with a clear choice of controls.',poster:'assets/optimized/refresh/category-hero-bidet-desktop.webp',posterMobile:'assets/optimized/refresh/category-hero-bidet-mobile.webp',groups:['bidetsHandle','bidetsButton']}
    },
    groups:{
      onePieceHU:{title:'H / U White Series',summary:'Calm white and neutral finishes for versatile residential and project bathrooms.',models:['605','608','806','809','810A','810B','811']},
      onePieceO:{title:'O Color Series',summary:'Expressive colors and rounded silhouettes for more personal bathroom interiors.',models:['801P','805']},
      wallHung:{title:'Wall-hung Collection',summary:'Compact intelligent toilets designed around concealed rough-in brackets.',models:['888B','611B']},
      bidetsHandle:{title:'Handle-control Bidet Seats',summary:'F01 and F02 share portable handle operation, with V-shaped and U-shaped fit options.',models:['F01-F02']},
      bidetsButton:{title:'Button & Remote Bidet Seats',summary:'F01S and F02S combine portable keys with wireless remote control in two fit options.',models:['F01S-F02S']}
    },
    products
  };
})();
