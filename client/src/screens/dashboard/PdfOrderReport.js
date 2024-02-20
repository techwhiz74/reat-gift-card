import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import moment from "moment";

const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  section: {
    margin: 20,
    paddingTop: "10%",
    paddingBottom: "10%",
    paddingLeft: "7.5%",
    paddingRight: "7.5%",
    lineHeight: 1.5,
    flexGrow: 1,
    fontFamily: "Times-Roman",
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginTop: 10,
    marginBottom: 10,
    textIndent: 20,
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  tableCellLabel: {
    width: 150,
    marginRight: 10,
  },
  tableCellValue: {
    flex: 1,
  },
});

const PdfOrderReport = ({ formData }) => {
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.title}>Order Details</Text>
          <Text style={pdfStyles.subTitle}>Customer Info </Text>
          <View style={pdfStyles.tableRow}>
            <Text style={pdfStyles.tableCellLabel}>Username :</Text>
            <Text style={pdfStyles.tableCellValue}>{formData.user.name}</Text>
          </View>
          <View style={pdfStyles.tableRow}>
            <Text style={pdfStyles.tableCellLabel}>Email :</Text>
            <Text style={pdfStyles.tableCellValue}>{formData.user.email}</Text>
          </View>
          <Text style={pdfStyles.subTitle}>Delivery Address </Text>
          <View style={pdfStyles.tableRow}>
            <Text style={pdfStyles.tableCellLabel}>Recipient :</Text>
            <Text style={pdfStyles.tableCellValue}>
              {formData.shippingAddress.name}
            </Text>
          </View>
          <View style={pdfStyles.tableRow}>
            <Text style={pdfStyles.tableCellLabel}>Address :</Text>
            <Text style={pdfStyles.tableCellValue}>
              {formData.shippingAddress.street_address},{" "}
              {formData.shippingAddress.city}, {formData.shippingAddress.state}
            </Text>
          </View>
          <View style={pdfStyles.tableRow}>
            <Text style={pdfStyles.tableCellLabel}>Zip Code :</Text>
            <Text style={pdfStyles.tableCellValue}>
              {formData.shippingAddress.zip_code}
            </Text>
          </View>
          <Text style={pdfStyles.subTitle}>Order Summary </Text>
          <View style={pdfStyles.tableRow}>
            <Text style={pdfStyles.tableCellLabel}>Greeting Cards:</Text>
            <Text style={pdfStyles.tableCellValue}>
              {formData.postageFee > 0
                ? `£ ${formData.cardPrice?.toFixed(2)}`
                : "FREE"}
            </Text>
          </View>
          <View style={pdfStyles.tableRow}>
            <Text style={pdfStyles.tableCellLabel}>Postage Fee:</Text>
            <Text style={pdfStyles.tableCellValue}>
              £ {formData.postageFee?.toFixed(2)}
            </Text>
          </View>
          <View style={pdfStyles.tableRow}>
            <Text style={pdfStyles.tableCellLabel}>Suggested Gifts:</Text>
            <Text style={pdfStyles.tableCellValue}>
              £ {formData.giftPrice?.toFixed(2)}
            </Text>
          </View>
          {formData.giftShipping ? (
            <View style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableCellLabel}>Gift Shipping Cost:</Text>
              <Text style={pdfStyles.tableCellValue}>
                £ {formData.giftShipping?.toFixed(2)}
              </Text>
            </View>
          ) : null}
          <View style={pdfStyles.tableRow}>
            <Text style={pdfStyles.tableCellLabel}>Gift-Cards Fee:</Text>
            <Text style={pdfStyles.tableCellValue}>
              £ {formData.giftCardFee?.toFixed(2)}
            </Text>
          </View>
          <View style={pdfStyles.tableRow}>
            <Text style={pdfStyles.tableCellLabel}>Delivery:</Text>
            <Text style={pdfStyles.tableCellValue}>
              {formData.deliveryFee > 0
                ? `£ ${formData.deliveryFee?.toFixed(2)}`
                : "FREE"}
            </Text>
          </View>
          <View style={pdfStyles.tableRow}>
            <Text style={pdfStyles.tableCellLabel}>Total price:</Text>
            <Text style={pdfStyles.tableCellValue}>
              £ {formData.totalPrice}
            </Text>
          </View>
          <View style={pdfStyles.tableRow}>
            <Text style={pdfStyles.tableCellLabel}>Date :</Text>
            <Text style={pdfStyles.tableCellValue}>
              {moment(formData.createdAt).format("DD/MM/YYYY hh:mm")}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfOrderReport;
