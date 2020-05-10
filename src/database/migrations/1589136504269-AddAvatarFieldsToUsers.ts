import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddAvatarFieldsToUsers1589136504269 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.dropColumn('users', 'avatar');
  }
}
