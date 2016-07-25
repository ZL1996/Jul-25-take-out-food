describe("splitInfo test",function () {
  it("splitedInfo is right ",function () {
    let info = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let splitedInfo = [{id:'ITEM0001',amount:1},
      {id:'ITEM0013',amount:2},
      {id:'ITEM0022',amount:1}];
    expect(splitInfo(info)).toEqual(splitedInfo);
  });
});

describe("matchPro test",function () {
  it("matchedPromotionInfo is right",function () {
    let splitedInfo = [{id:'ITEM0001',amount:1},
      {id:'ITEM0013',amount:2},
      {id:'ITEM0022',amount:1}];
    
    let allPromotions = [{
      type: '满30减6元'
    }, {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];
    
    let matchedPromotionInfo = [{id:'ITEM0001',amount:1,type:'指定菜品半价'},
      {id:'ITEM0013',amount:2,type:'满30减6元'},
      {id:'ITEM0022',amount:1,type:'指定菜品半价'}];
    
    expect(matchPro(splitedInfo,allPromotions)).toEqual(matchedPromotionInfo);
  });
});

describe("matchItemsInfo test",function () {
  it("matchedItemsInfo is right",function () {
    let matchedPromotionInfo = [{id:'ITEM0001',amount:1,type:'指定菜品半价'},
      {id:'ITEM0013',amount:2,type:'满30减6元'},
      {id:'ITEM0022',amount:1,type:'指定菜品半价'}];
    
    let allItems = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00
    }, {
      id: 'ITEM0030',
      name: '冰锋',
      price: 2.00
    }];
    
    let matchedItemsInfo = matchedPromotionInfo = [{id:'ITEM0001',name:'黄焖鸡',price:18.00,amount:1,type:'指定菜品半价'},
      {id:'ITEM0013',name:'肉夹馍',price:6.00,amount:2,type:'满30减6元'},
      {id:'ITEM0022',name:'凉皮',price:8.00,amount:1,type:'指定菜品半价'}];
    
    expect(matchItemsInfo(matchedPromotionInfo,allItems)).toEqual(matchedItemsInfo);
  });
});

describe("caculateOriginTotal test",function () {
  it("originTotal is right ",function () {
    let matchedItemsInfo = matchedPromotionInfo = [{id:'ITEM0001',name:'黄焖鸡',price:18.00,amount:1,type:'指定菜品半价'},
      {id:'ITEM0013',name:'肉夹馍',price:6.00,amount:2,type:'满30减6元'},
      {id:'ITEM0022',name:'凉皮',price:8.00,amount:1,type:'指定菜品半价'}];
    let originTotal = 38;
    expect(caculateOriginTotal(matchedItemsInfo)).toBe(originTotal);
  });
});

describe("caculateHalfPriceTotal test",function () {
  it("halfPriceTotal is right",function () {
    let matchedItemsInfo = matchedPromotionInfo = [{id:'ITEM0001',name:'黄焖鸡',price:18.00,amount:1,type:'指定菜品半价'},
      {id:'ITEM0013',name:'肉夹馍',price:6.00,amount:2,type:'满30减6元'},
      {id:'ITEM0022',name:'凉皮',price:8.00,amount:1,type:'指定菜品半价'}];
    
    let halfPrcieTotal = 25;
    expect(caculateHalfPriceTotal(matchedItemsInfo)).toBe(halfPrcieTotal);
  });
}); 

describe("caculateCutSix test ",function () {
  it("cutSixTotal is right ",function () {
    let cutSixTotal = 32;
    let matchedItemsInfo = matchedPromotionInfo = [{id:'ITEM0001',name:'黄焖鸡',price:18.00,amount:1,type:'指定菜品半价'},
      {id:'ITEM0013',name:'肉夹馍',price:6.00,amount:2,type:'满30减6元'},
      {id:'ITEM0022',name:'凉皮',price:8.00,amount:1,type:'指定菜品半价'}];
    let originTotal = 38;
    expect(caculateCutSix(matchedItemsInfo,originTotal)).toBe(cutSixTotal);
  });
});

describe("selectCutTotal test",function () {
  it("finalTotal is right ",function () {
    let finalTotal = 25;
    let halfPrcieTotal = 25;
    let cutSixTotal = 32;
    expect(selectCutTotal(halfPrcieTotal,cutSixTotal)).toBe(finalTotal);
  });
});

describe("caculateSpare test",function () {
  it("spare is right",function () {
    let spare = 13;
    let originTotal = 38;
    let finalTotal = 25;
    expect(caculateSpare(originTotal,finalTotal)).toBe(spare);
  });
});
