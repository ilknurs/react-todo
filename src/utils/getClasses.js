//Verilen sınıf dizisindeki boş dizeleri filtreler 
//ve kalan sınıfların bir boşlukla birleştirildiği bir string döndürür.
export const getClasses = (classes) =>
  classes
    .filter((item) => item !== '')
    .join(' ')
    .trim();