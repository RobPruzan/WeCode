# Generated by Django 4.1.4 on 2023-01-11 02:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_challenge'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='challenge',
            name='answer',
        ),
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(blank=True, default='', max_length=2000, null=True)),
                ('challenge', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='answer', to='api.challenge')),
            ],
        ),
        migrations.AddField(
            model_name='challenge',
            name='correct_answer',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='question', to='api.answer'),
        ),
    ]
