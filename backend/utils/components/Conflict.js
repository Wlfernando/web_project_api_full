exports.Conflict = class extends Error {
  constructor(message) {
    super(message);
    this.name = 'Conflict';
    this.statusCode = 409;
  }
};
