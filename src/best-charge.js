function bestCharge(selectedItems) {
  let splitedInfo = splitInfo(info);
  let allItems = loadAllItems();
  let allPromotions = loadPromotions();
  let matchedPromotionsInfo = matchPro(splitedInfo,allPromotions);
  let matchedItemsInfo = matchItemsInfo(matchedPromotionInfo,allItems);
  let originTotal = caculateOriginTotal(matchedItemsInfo);
  let halfPriceTotal = caculateHalfPriceTotal(matchedItemsInfo);
  let cutSixTotal = caculateCutSix(matchedItemsInfo,originTotal);
  let finalTotal = selectCutTotal(halfPrcieTotal,cutSixTotal);
  let spare = caculateSpare(originTotal,finalTotal);
}

function splitInfo(info) {
  let splitedInfo = [];
  for(let item of info){
    let temp = item.split(' x ');
    let temp1 = parseInt(temp[1]);
    splitedInfo.push(Object.assign({},{id:temp[0]},{amount:temp1}));
  }
  return splitedInfo;
}

function matchPro(splitedInfo,allPromotions) {
  let matchedPromotionsInfo = [];
  for(let i=0;i<splitedInfo.length;i++){
    allPromotions.find(function (item) {
      let exist = item.items.find(function (ite) {
        return ite === splitedInfo[i].id;
      });
      type = '满30减6元';
      if(exist){
        type = item.type;
      }
      matchedPromotionsInfo.push(Object.assign({},matchedPromotionsInfo[i],{type:type}));
    });
  }
  return matchedPromotionsInfo;
}

function matchItemsInfo(matchedPromotionInfo,allItems) {
  let matchedItemsInfo = [];
  for(let i=0;i<matchedPromotionInfo.length;i++){
    let temp = allItems.find(function (item) {
      return item.id === matchedPromotionInfo[i].id;
    });
    if(temp){
      matchedItemsInfo.push(Object.assign({},temp,{amount:matchedPromotionInfo[i].amount},{type:matchedPromotionInfo[i].type}));
    }
  }
  return matchedItemsInfo;
}

function caculateOriginTotal(matchedItemsInfo) {
  let originTotal = 0;
  for(let i of matchedItemsInfo){
    originTotal += i.price * i.amount;
  }
  return originTotal;
}

function caculateHalfPriceTotal(matchedItemsInfo) {
  let halfpriceTotal = 0;
  for(let i of matchedItemsInfo){
    if (i.type === '指定菜品半价'){
      i.price = i.price/2;
    }
    halfpriceTotal += i.price * i.amount;
  }
  return halfpriceTotal;
}

function caculateCutSix(matchedItemsInfo,originTotal) {
  let cutSixTotal=0;
  if (originTotal>=30){
    return cutSixTotal = originTotal-6;
  }
  return originTotal;
}

function selectCutTotal(halfPrcieTotal,cutSixTotal) {
  let finalTotal = cutSixTotal;
  if (halfPrcieTotal < cutSixTotal){
    finalTotal = halfPrcieTotal;
  }
  return finalTotal;
}

function caculateSpare(originTotal,finalTotal) {
  let spare = originTotal - finalTotal;
  return spare;
}
