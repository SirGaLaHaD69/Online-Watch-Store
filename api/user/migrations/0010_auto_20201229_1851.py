# Generated by Django 3.0.8 on 2020-12-29 13:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0009_auto_20201229_1547'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customuser',
            old_name='crated_at',
            new_name='created_at',
        ),
    ]
