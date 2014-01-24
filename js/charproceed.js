function removeHeader(inputString)
{
  var proceedString = deleteCharacters(inputString, "var ibike = ");
  proceedString = deleteCharacters(inputString, "var isinglebike = ");
  return proceedString;
}
function replaceCharacters(conversionString,inChar,outChar)

{

  var convertedString = conversionString.split(inChar);

  convertedString = convertedString.join(outChar);

  return convertedString;

}
function deleteCharacters(conversionString,inChar)

{

  var convertedString = conversionString.split(inChar);

  return convertedString;

}