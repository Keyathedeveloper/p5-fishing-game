from marshmallow import Schema, fields, validate

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    email = fields.Email(required=True)
    created_at = fields.DateTime(dump_only=True)
    scores = fields.Nested('ScoreSchema', many=True, exclude=('user',))

class ScoreSchema(Schema):
    id = fields.Int(dump_only=True)
    score_value = fields.Int(required=True)

class PowerUpSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    description = fields.Str(required=True)
    effect = fields.Str(required=True)
    duration = fields.Int(allow_none=True)  # Nullable for permanent power-ups
