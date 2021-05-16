import '../src/index';

const inputData = {
  orient: 'horizontal', type: 'range', origin: 10, range: 100, start: 10, end: 30, step: 1, scale: true, scaleInterval: 20, cloud: 'test',
};
const inputDataList = {
  orient: 'vertical', type: 'point', scale: true, cloud: 'test', list: ['one', 'two', 'three', 'four', 'five'],
};

document.body.innerHTML = '<div style="width:100px; height:50px"> </div>';
const node = jQuery('div');

describe('Creation of the slider object', () => {
  test('it check that the slider object create correctly', () => {
    const createdObject = node.rangeSlider(inputData);

    expect(createdObject).toHaveProperty('model');
    expect(createdObject).toHaveProperty('presenter');
    expect(createdObject).toHaveProperty('view');
    expect(createdObject).toHaveProperty('config');
  });

  test('it check the creation of object for list', () => {
    const createdObject = node.rangeSlider(inputDataList);
    expect(createdObject.config.origin).toEqual(0);
    expect(createdObject.config.range).toEqual(inputDataList.list.length - 1);
    expect(createdObject.config.step).toEqual(1);
  });

  test('it check the correctness of the coordinates. if they are entered incorrectly the constructor should have formatted them', () => {
    for (let n = 0; n < 55; n += 1) {
      const dataClone = { ...inputData };

      const createdObject = node.rangeSlider(dataClone);
      const start = Math.random() >= 0.5
        ? Math.round(Math.random() * 100)
        : -Math.round(Math.random() * 100);

      const end = Math.random() >= 0.5
        ? Math.round(Math.random() * 100)
        : -Math.round(Math.random() * 100);
      createdObject.init(start, end);
      const verStart = createdObject.getValue()[0] - dataClone.origin;
      const verEnd = createdObject.getValue()[1] - dataClone.origin;

      expect([start - dataClone.origin, 0, dataClone.range - 1]).toContain(verStart);
      expect(verStart).toBeLessThan(verEnd);
      expect(verStart).toBeGreaterThanOrEqual(0);

      expect([end - dataClone.origin, dataClone.range, verStart + 1]).toContain(verEnd);
      expect(verEnd).toBeGreaterThan(verStart);
      expect(verEnd).toBeLessThanOrEqual(dataClone.range);
    }
  });

  test('it check the function of initialization and rendering of elements', () => {
    const createdObject = node.rangeSlider(inputData);

    expect(createdObject.view.element).not.toBeTruthy();
    expect(createdObject.view.tumblers.elements).not.toBeTruthy();
    expect(createdObject.view.line.element).not.toBeTruthy();
    expect(createdObject.view.selected.element).not.toBeTruthy();
    expect(createdObject.view.scale.element).not.toBeTruthy();
    createdObject.init();
    expect(createdObject.view.element).toBeTruthy();
    expect(createdObject.view.tumblers.elements).toBeTruthy();
    expect(createdObject.view.line.element).toBeTruthy();
    expect(createdObject.view.selected.element).toBeTruthy();
    expect(createdObject.view.scale.element).toBeTruthy();
  });

  test('it checks that the layers are connected correctly', () => {
    // проверка закольцованности
    const createdObject = node.rangeSlider(inputData);

    createdObject.view.updateView = jest.fn();
    const lastLink = createdObject.view.updateView;

    createdObject.init();
    expect(lastLink).toBeCalled();

    // проверка того, что презентер пробрасывает данные
    const createdObject2 = node.rangeSlider(inputData);
    createdObject2.model.updateConfig = jest.fn();
    const modelReceiver = createdObject2.model.updateConfig;

    const testObject = { a: 'string', b: 55, c: true };
    createdObject2.init();
    createdObject2.presenter.reactToInteraction(testObject);
    expect(modelReceiver).toHaveBeenCalledWith(testObject);
  });
});

describe('Slider functioning', () => {
  describe('data processing', () => {
    test('range: 100, step: 1, method: drag', () => {
      const createdObject = node.rangeSlider(inputData);
      createdObject.init();

      createdObject.view.updateView = jest.fn();
      const ViewUpdate = createdObject.view.updateView;

      createdObject.presenter.reactToInteraction({ startPos: 25, endPos: 40, method: 'drag' });
      expect(ViewUpdate).toBeCalledWith({ firCoor: 25, secCoor: 40 });
      createdObject.presenter.reactToInteraction({ startPos: -10, endPos: 120, method: 'drag' });
      expect(ViewUpdate).toBeCalledWith({ firCoor: 0, secCoor: 100 });
    });

    test('range: 100, step: 1, method: tepping', () => {
      const createdObject = node.rangeSlider(inputData);
      createdObject.init();

      createdObject.view.updateView = jest.fn();
      const ViewUpdate = createdObject.view.updateView;

      createdObject.presenter.reactToInteraction({ startPos: 1, endPos: -1, method: 'tepping' });
      expect(ViewUpdate).toBeCalledWith({ firCoor: 1, secCoor: 99 });

      createdObject.presenter.reactToInteraction({ startPos: -1, endPos: -1, method: 'tepping' });
      expect(ViewUpdate).toBeCalledWith({ firCoor: 0, secCoor: 98 });
    });

    test('range: 100, step: 1, method: scaleClick', () => {
      const createdObject = node.rangeSlider(inputData);
      createdObject.init();

      createdObject.view.updateView = jest.fn();
      const ViewUpdate = createdObject.view.updateView;

      createdObject.presenter.reactToInteraction({ startPos: 60, method: 'scaleClick' });
      expect(ViewUpdate).toBeCalledWith({ firCoor: 0, secCoor: 50 });

      createdObject.presenter.reactToInteraction({ startPos: 20, method: 'scaleClick' });
      expect(ViewUpdate).toBeCalledWith({ firCoor: 10, secCoor: 50 });
    });

    test('range: 100, step: 1, method: direct', () => {
      const createdObject = node.rangeSlider(inputData);
      createdObject.init();

      createdObject.view.updateView = jest.fn();
      const ViewUpdate = createdObject.view.updateView;

      createdObject.presenter.reactToInteraction({ startPos: 20, endPos: 70, method: 'direct' });
      expect(ViewUpdate).toBeCalledWith({ firCoor: 10, secCoor: 60 });

      createdObject.presenter.reactToInteraction({ startPos: 20, endPos: 5, method: 'direct' });
      expect(ViewUpdate).toBeCalledWith({ firCoor: 10, secCoor: 60 });
    });

    test('range: 60, step: 12, method: drag', () => {
      const createdObject = node.rangeSlider(inputData);
      createdObject.config.range = 60;
      createdObject.config.step = 12;
      createdObject.init();

      createdObject.view.updateView = jest.fn();
      const ViewUpdate = createdObject.view.updateView;
      createdObject.presenter.reactToInteraction({ startPos: 20, endPos: 50, method: 'drag' });
      expect(ViewUpdate).toBeCalledWith({ firCoor: 20, secCoor: 60 });
      createdObject.presenter.reactToInteraction({ endPos: 28, method: 'drag' });
      expect(ViewUpdate).toBeCalledWith({ firCoor: 20, secCoor: 40 });
      createdObject.presenter.reactToInteraction({ startPos: -12, method: 'drag' });
      expect(ViewUpdate).toBeCalledWith({ firCoor: 0, secCoor: 40 });
      createdObject.presenter.reactToInteraction({ endPos: 90, method: 'drag' });
      expect(ViewUpdate).toBeCalledWith({ firCoor: 0, secCoor: 100 });
    });

    test('range: 60, step: 12, method: tepping', () => {
      const createdObject = node.rangeSlider(inputData);
      createdObject.config.range = 60;
      createdObject.config.step = 12;
      createdObject.init(10, 70);

      createdObject.view.updateView = jest.fn();
      const ViewUpdate = createdObject.view.updateView;

      createdObject.presenter.reactToInteraction({ startPos: 1, endPos: -1, method: 'tepping' });
      expect(ViewUpdate).toBeCalledWith({ firCoor: 20, secCoor: 80 });

      createdObject.presenter.reactToInteraction({ startPos: 1, endPos: -1, method: 'tepping' });
      expect(ViewUpdate).toBeCalledWith({ firCoor: 40, secCoor: 60 });

      createdObject.presenter.reactToInteraction({ startPos: 2, method: 'tepping' });
      expect(ViewUpdate).toBeCalledWith({ firCoor: 40, secCoor: 60 });

      createdObject.presenter.reactToInteraction({ startPos: -1, endPos: 1, method: 'tepping' });
      expect(ViewUpdate).toBeCalledWith({ firCoor: 20, secCoor: 80 });
    });

    test('range: 60, step: 12, method: scaleClick', () => {
      const createdObject = node.rangeSlider(inputData);
      createdObject.config.range = 60;
      createdObject.config.step = 12;
      createdObject.init();

      createdObject.view.updateView = jest.fn();
      const ViewUpdate = createdObject.view.updateView;

      createdObject.presenter.reactToInteraction({ startPos: 22, method: 'scaleClick' });
      expect(ViewUpdate).toBeCalledWith({ firCoor: 20, secCoor: 100 });
      createdObject.presenter.reactToInteraction({ startPos: 58, method: 'scaleClick' });
      expect(ViewUpdate).toBeCalledWith({ firCoor: 20, secCoor: 80 });
      createdObject.presenter.reactToInteraction({ startPos: 34, method: 'scaleClick' });
      expect(ViewUpdate).toBeCalledWith({ firCoor: 40, secCoor: 80 });
    });

    test('range: 60, step: 12, method: direct', () => {
      const createdObject = node.rangeSlider(inputData);
      createdObject.config.range = 60;
      createdObject.config.step = 12;
      createdObject.init();

      createdObject.view.updateView = jest.fn();
      const ViewUpdate = createdObject.view.updateView;

      createdObject.presenter.reactToInteraction({ startPos: 35, endPos: 75, method: 'direct' });
      expect(ViewUpdate).toBeCalledWith({ firCoor: (100 / 60) * 25, secCoor: 100 });

      createdObject.presenter.reactToInteraction({ startPos: -20, endPos: 18, method: 'direct' });
      expect(ViewUpdate).toBeCalledWith({ firCoor: 0, secCoor: (100 / 60) * 8 });
    });
  });
});