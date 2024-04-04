from marshmallow import Schema, fields, validate

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    email = fields.Email(required=True, validate=validate.Email())  # Adding email validation
    password = fields.Str(required=True, load_only=True)

class GameSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    description = fields.Str(required=True)
    image_url = fields.Url(required=True)
    release_date = fields.Date(required=True)

# Add more schemas for other resources as needed
