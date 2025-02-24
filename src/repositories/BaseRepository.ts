export default abstract class BaseRepository {
  abstract model(): any;

  async findOne(predicate: any) {
    const model = this.model();
    return await model.findOne(predicate);
  }

  async softDelete(predicate: Object, transaction: any = null) {
    const model = this.model();
    const t = transaction || (await model.sequelize.transaction()); // Start a new transaction if not provided
    predicate["transaction"] = t;

    try {
      const obj = await model.destroy(predicate);
      if (!transaction) await t.commit(); // Commit only if a new transaction was created
      return obj;
    } catch (error) {
      if (!transaction) await t.rollback();
      throw error;
    }
  }

  async create(data: Object) {
    const model = this.model();
    const t = await model.sequelize.transaction();

    try {
      const obj = await model.create(data, { transaction: t });
      await t.commit();
      return obj;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async update(data: Object, prediction: Object) {
    const model = this.model();
    const t = await model.sequelize.transaction();
    prediction["transaction"] = t;

    try {
      const obj = await model.update(data, prediction);
      await t.commit();
      return obj;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async find(prediction: object = {}) {
    const model = this.model();
    return await model.findAll(prediction);
  }

  async findAndCount(prediction: object = {}) {
    const model = this.model();
    return await model.findAndCountAll(prediction);
  }
}
