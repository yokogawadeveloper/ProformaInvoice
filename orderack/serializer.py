import datetime
from rest_framework import serializers
from .models import orderAcknowledgement, orderAcknowledgementHistory


class orderAcknowledgementHistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = orderAcknowledgementHistory
        fields = '__all__'

    # def to_representation(self, data):
    #     if data.DeleteFlag is not True:
    #         return super(orderAcknowledgementHistorySerializer, self).to_representation(data)

    def create(self, validated_data):
        validated_data['SubmittedBy'] = self.context['request'].user
        return super(orderAcknowledgementHistorySerializer, self).create(validated_data=validated_data)


class orderAcknowledgementSerializer(serializers.ModelSerializer):
    order = serializers.SerializerMethodField()
    total_amount_with_tcs_in_words = serializers.ReadOnlyField()

    class Meta:
        model = orderAcknowledgement
        fields = '__all__'

    def get_order(self, instance):
        items = instance.order.all().order_by('OrderAck_HistoryId')
        return orderAcknowledgementHistorySerializer(items, many=True).data

    def create(self, validated_data):
        validated_data['SubmittedBy'] = self.context['request'].user
        return super(orderAcknowledgementSerializer, self).create(validated_data=validated_data)

    def update(self, instance, validated_data):
        validated_data['UpdatedBy'] = self.context['request'].user
        return super(orderAcknowledgementSerializer, self).update(instance=instance, validated_data=validated_data)


class orderAckSerializer(serializers.ModelSerializer):
    order = serializers.SerializerMethodField()

    class Meta:
        model = orderAcknowledgement
        fields = '__all__'


    def get_order(self, instance):
        items = instance.order.all().order_by('OrderAck_HistoryId')
        return orderAcknowledgementHistorySerializer(items, many=True).data
