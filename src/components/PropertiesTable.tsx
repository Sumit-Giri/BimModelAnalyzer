
import React, { useEffect, useState } from "react";
import {Grid,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,TextField,} from "@mui/material";
import { COMMON_IDENTIFIERS, COST_MAPPING, NAME_MAPPING } from "../model/constants/constants";

interface UserCosts {
  [key: string]: number;
}

interface PropertiesTableProps {
  propertiesData: any[];
  updatedPropertyData: any[];
  setUpdatedPropertyData: React.Dispatch<React.SetStateAction<any[]>>;
}

const PropertiesTable: React.FC<PropertiesTableProps> = ({
  propertiesData,
  updatedPropertyData,
  setUpdatedPropertyData,
}) => {
  const transformedPropertiesData = propertiesData?.reduce((accumulator: any, currentValue: any) => {
    const updatedName = COMMON_IDENTIFIERS.reduce((name, identifier) => {
      if (currentValue.name.toLowerCase().includes(identifier)) {
        return NAME_MAPPING[identifier];
      }
      return name;
    }, currentValue.name);

    const existingIndex = accumulator.findIndex(
      (item: any) => item.name.toLowerCase() === updatedName.toLowerCase()
    );
    if (existingIndex !== -1) {
      accumulator[existingIndex].quantity += 1;
    } else {
      accumulator.push({ ...currentValue, name: updatedName, quantity: 1 });
    }
    return accumulator;
  }, []);

  const defaultUserCosts: UserCosts = {};
  for (const name in COST_MAPPING) {
    defaultUserCosts[name.toLowerCase()] = COST_MAPPING[name];
  }

  const [userCosts, setUserCosts] = useState<UserCosts>(defaultUserCosts);

  const propertiesDataWithCost = transformedPropertiesData?.map((item: any) => {
    const cost = userCosts[item.name.toLowerCase()] || COST_MAPPING[item.name.toLowerCase()] || 1;
    return {
      ...item,
      cost: cost,
      totalCost: item.quantity * cost,
    };
  });

  const totalCost = propertiesDataWithCost.reduce((total: number, property: any) => total + property.totalCost, 0);

  useEffect(() => {
    if (
      propertiesDataWithCost &&
      propertiesDataWithCost.length > 0 &&
      JSON.stringify(propertiesDataWithCost) !== JSON.stringify(updatedPropertyData)
    ) {
      setUpdatedPropertyData(propertiesDataWithCost);
    }
  }, [propertiesDataWithCost, updatedPropertyData, setUpdatedPropertyData]);

  const handleCostChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
    const newValue = parseFloat((event.target as HTMLInputElement).value);
    setUserCosts((prevUserCosts: UserCosts) => ({
      ...prevUserCosts,
      [name.toLowerCase()]: newValue,
    }));
  };

  return (
    <Grid item xs={6} style={{ height: "92%" }}>
      <div style={{ background: "#ccc", overflowY: "scroll", height: "100%" }}>
        <Typography
          variant="h6"
          style={{
            height: "6.8%",
            color: "white",
            textAlign: "center",
            padding: "8px",
            background: "#303030",
            borderLeft:'2px solid #fff',
          }}
        >
          Bill Of Material
        </Typography>
        <div >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Index</TableCell>
                  <TableCell>Object ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Cost(Rs)</TableCell>
                  <TableCell>Total Cost(Rs)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {propertiesDataWithCost?.map((property: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{property.objectid}</TableCell>
                    <TableCell>{property.name}</TableCell>
                    <TableCell>{property.quantity}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={userCosts[property.name.toLowerCase()] || ""}
                        onChange={(event) => handleCostChange(event, property.name)}
                      />
                    </TableCell>
                    <TableCell>{property.totalCost}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={5} align="right">
                    <strong>Total:</strong>
                  </TableCell>
                  <TableCell>{totalCost}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Grid>
  );
};

export default PropertiesTable;
