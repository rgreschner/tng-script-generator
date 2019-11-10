export class MockStrategy {
  public authenticate(...args) {
    const self = (this as any);
    self.success({}, {});
  }
}
